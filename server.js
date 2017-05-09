'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'public', 'index.html');

const server = express()
	.use(express.static(path.join(__dirname)))
	.use((req, res) => res.sendFile(INDEX))
	.listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

io.on('connection', (socket) => {
	console.log('Chat Message')
	socket.on('chatMessage', (from, msg) => {
		io.emit('chatMessage', from, msg);
	});
	socket.on('notifyUser', (user) => {
		io.emit('notifyUser', user);
	});
	socket.on('saveUser', (user) => {
		io.emit('saveUser', user);
	});
});
