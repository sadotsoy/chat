var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

// Initialize appication with route / (that means root of the application)
app.set('port', (process.env.PORT || 5000 ));

app.get('/', function(req, res){
  var express=require('express');
  app.use(express.static(path.join(__dirname)));
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Register events on socket connection
io.on('connection', function(socket){
	socket.on('chatMessage', function(from, msg){
		io.emit('chatMessage', from, msg);
  });
	socket.on('notifyUser', function(user){
		io.emit('notifyUser', user);
  });
});

// Listen application request on port 3000
app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
})
