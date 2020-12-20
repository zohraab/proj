const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// Obtenir le nom d'utilisateur et la salle à partir de l'URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});

const socket = io();

// Rejoindre le chat
socket.emit('joinRoom', { username, room });

// Obtenez de l'espace et des utilisateurs
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// Message du serveur
socket.on('message', message => {
  console.log(message);
  outputMessage(message);

 // Défiler vers le bas
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Envoi du message
chatForm.addEventListener('submit', e => {
  e.preventDefault();

  // Récupère le texte du message
  let msg = e.target.elements.msg.value;
  
  msg = msg.trim();
  
  if (!msg){
    return false;
  }

  // Emettre un message au serveur
  socket.emit('chatMessage', msg);


// Effacer l'entrée
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

// Message de sortie vers DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  const p = document.createElement('p');
  p.classList.add('meta');
  p.innerText = message.username;
  p.innerHTML += `<span>${message.time}</span>`;
  div.appendChild(p);
  const para = document.createElement('p');
  para.classList.add('text');
  para.innerText = message.text;
  div.appendChild(para);
  document.querySelector('.chat-messages').appendChild(div);
}

// Ajouter le nom de la salle au DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

// Ajouter des utilisateurs au DOM
function outputUsers(users) {
  userList.innerHTML = '';
  users.forEach(user=>{
    const li = document.createElement('li');
    li.innerText = user.username;
    userList.appendChild(li);
  });
 }
