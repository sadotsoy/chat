let dom = [
  '[0,0]',
  '[0,1]',
  '[0,2]',
  '[0,3]',
  '[0,4]',
  '[0,5]',
  '[0,6]',
  '[1,1]',
  '[1,2]',
  '[1,3]',
  '[1,4]',
  '[1,5]',
  '[1,6]',
  '[2,2]',
  '[2,3]',
  '[2,4]',
  '[2,5]',
  '[2,6]',
  '[3,3]',
  '[3,4]',
  '[3,5]',
  '[3,6]',
  '[4,4]',
  '[4,5]',
  '[4,6]',
  '[5,5]',
  '[5,6]',
  '[6,6]'
];
const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
let usuarios = {};
let fichas = [],
  fichasS = [],
  fichaR = [];
let cont = 0,
  nUser = 0;

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'public', 'index.html');

const server = express()
  .use(express.static(path.join(__dirname)))
  .use((req, res) => res.sendFile(INDEX))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

io.on('connection', (socket) => {
  if (nUser < 3) {
    console.log('Chat Message')
    socket.on('chatMessage', (from, msg) => {
      io.emit('chatMessage', from, msg);
    });
    socket.on('notifyUser', (user) => {
      io.emit('notifyUser', user);
    });
    socket.on('saveUser', (user) => {
      fichas = [];
      usuarios[user] = {};
      usuarios[user].fichas = [];
    });
    socket.on('sendDomino', (user) => {
      getDomino(user);
    });
    socket.on('serverDomino', (user, message) => {
      message = serverDomino();
      io.emit('serverDomino', user, "Ficha restante: " + message);
    });
    socket.on('showDomino', (user, message) => {
      message = showDomino(user);
      socket.emit('showDomino', user, "Tus fichas son: " + message);
    });
    socket.on('reset', (user) => {
      cont = 0;
      fichasS = [];
      usuarios[user].fichas = [];
      console.log(usuarios)
    });
    socket.on('start', (user, message) => {
      getDomino(user);
    });
    nUser++;
    console.log(nUser);
  }
  socket.on('disconnect', function() {
    nUser--;
    console.log(nUser);
    io.emit('user disconnected');
  });

});

function getDomino(user) {
  while (cont < 9) {
    let a = Math.floor(Math.random() * (28 - 0)) - 0;
    if (((fichas.indexOf(dom[a])) === -1) && ((fichasS.indexOf(dom[a])) === -1)) {
      fichas.push(dom[a]);
      fichasS.push(dom[a]);
      cont++;
    }
  }
  cont = 0;
  usuarios[user].fichas = fichas;
  // console.log("Fichas dadas"+fichasS);
  console.log(usuarios);
  console.log(dom[5].charAt(3));
}

function serverDomino() {
  cont = 0;
  fichaR = [];
  while (cont < 28) {
    if ((fichasS.indexOf(dom[cont])) === -1) {
      fichaR.push(dom[cont]);
    }
    cont++;
  }
  return fichaR;
}

function showDomino(user) {
  return usuarios[user].fichas;
}
