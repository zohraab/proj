const users = [];

// Rejoignez l'utilisateur pour discuter
function userJoin(id, username, room,) {
  const user = { id, username, room };

  users.push(user);

  return user;
}

// Obtenir l'utilisateur actuel
function getCurrentUser(id) {
  return users.find(user => user.id === id);
}

// L'utilisateur quitte le chat
function userLeave(id) {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Obtenez des salles d'utilisateur
function getRoomUsers(room) {
  return users.filter(user => user.room === room);
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
};
