// var app = require('express')();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);
// var path = require('path');

// // Initialize appication with route / (that means root of the application)
// app.get('/', function(req, res){
//   var express=require('express');
//   app.use(express.static(path.join(__dirname)));
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// // Register events on socket connection
// io.on('connection', function(socket){
// 	socket.on('chatMessage', function(from, msg){
// 		io.emit('chatMessage', from, msg);
//   });
// 	socket.on('notifyUser', function(user){
// 		io.emit('notifyUser', user);
//   });
// });

// // Listen application request on port 3000
// http.listen(3000, function() {

// })

'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'public/index.html');

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
});
setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
