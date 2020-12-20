const path = require('path');
const http = require('http');
const express = require('express');
// 1
const router = require('./router');
const bodyParser = require('body-parser');
// rendre l'api accecible de partout sur le web(moii)
const cors = require('cors');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
app.use('/',router)
app.use(bodyParser.json())
// on donne l'accée a tout le monde(moii)  
app.use(cors());
// Définir le dossier statique
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'ChatCord Bot';

// Exécuter lorsque le client se connecte
io.on('connection', socket => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);



// Bienvenue à l'utilisateur actuel
    socket.emit('message', formatMessage(botName, 'Bienvenu au chat!'));

  // Diffusion lorsqu'un utilisateur se connecte
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(botName, `${user.username} a rejoint la discussion`)
      );

    // Envoyer des informations aux utilisateurs et aux salles
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });

// Écouter le chatMessage
  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit('message', formatMessage(user.username, msg));
  });

// S'exécute lorsque le client se déconnecte
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(botName, `${user.username} à quitté la discussion

        `)
      );

    // Envoyer des informations aux utilisateurs et aux salles
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`tu rentre ${PORT}`));
