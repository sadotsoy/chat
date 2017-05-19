var socket = io();

function submitfunction(){
  var from = $('#user').val();
  var message = $('#m').val();
  if(message != '') {
	  if(message == "start") {
		  // socket.emit('start', from, message);
	  }
	  if(message == "giveme") {
		  socket.emit('showDomino', from, message);
	  }
	  if(message == "reset") {
		  // socket.emit('reset', from);
	  }
	  if(message == "server") {
		  socket.emit('serverDomino', 'System', message);
	  }
	socket.emit('chatMessage', from, message);
	}
	$('#m').val('').focus();
	return false;
}

function notifyTyping() {
  var user = $('#user').val();
  socket.emit('notifyUser', user);
}

socket.on('chatMessage', function(from, msg){
  var me = $('#user').val();
  var color = (from == me) ? 'green' : '#009afd';
  var from = (from == me) ? 'Me' : from;
  $('#messages').append('<li><b style="color:' + color + '">' + from + '</b>: ' + msg + '</li>');
});

socket.on('notifyUser', function(user){
  var me = $('#user').val();
  if(user != me) {
    $('#notifyUser').text(user + ' is typing ...');
  }
  setTimeout(function(){ $('#notifyUser').text(''); }, 10000);;
});

$(document).ready(function(){
  var name = makeid();
  $('#user').val(name);
	socket.emit('chatMessage', 'System', '<b>' + name + '</b> has joined the discussion ---> to play domino use this command:  '+'<b>'+'\"giveme\"'+'</b>'+' to recieve dominoes. <b>\"server\"</b> to see the last Dominoe');
  // usuarios.username = name;
  // usuarios.number = Math.floor(Math.random()* (10 - 0)) + 0;
	socket.emit('saveUser',name);
	socket.emit('sendDomino', name);
});

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for( var i=0; i < 5; i++ ) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
socket.on('saveUser', function(user) {
});
socket.on('sendDomino', function(user) {
});
socket.on('serverDomino', function(user, message) {
  $('#messages').append('<li><b style="color:' + '">' + user + '</b>: ' + message + '</li>');
});
socket.on('showDomino', function(user, message) {
	showDomino(user, message);
});

 function domino() {
	 return "++ Fichas creadas";
 }

function showDomino(user, message){
  $('#messages').append('<li><b style="color:' + '">' + user + '</b>: ' + message + '</li>');
}
