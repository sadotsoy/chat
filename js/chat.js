var socket = io();
var cont = 0;
let usuarios ={};
let dom = [
	['0','0'],
	['0',1],
	['0',2],
	['0',3],
	['0',4],
	['0',5],
	['0',6],
	[1,1],
	[1,2],
	[1,3],
	[1,4],
	[1,5],
	[1,6],
	[2,2],
	[2,3],
	[2,4],
	[2,5],
	[2,6],
	[3,3],
	[3,4],
	[3,5],
	[3,6],
	[4,4],
	[4,5],
	[4,6],
	[5,5],
	[5,6],
	[6,6]
];
let fichasS =[], fichas =[], fichasR = [];

function submitfunction(){
  var from = $('#user').val();
  var message = $('#m').val();
  if(message != '') {
	  if(message == "start") {
		  message = domino();
	  }
	  if(message == "giveme") {
		  mes = seeDom(from);
		  $('#messages').append('<li><b style="color:' + '">' + from + '</b>: ' + mes + '</li>');
	  }
	  if(message == "reset") {
		 message = reset(from);
	  }
	  if(message == "server") {
		message = server();
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
	socket.emit('chatMessage', 'System', '<b>' + name + '</b> has joined the discussion ---> to play domino use this commands, '+'<b>'+'start'+'</b>'+' to start the game, '+'<b>'+'giveme'+'</b>'+' to recieve dominoes, '+'<b>'+' reset '+'</b>'+' to get a new Dominoes.');
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
	 Object.defineProperty(usuarios, user, {
		 enumerable: false,
		 configurable: true,
		 writable: true,
		 value: {}
	 });
 });
socket.on('sendDomino', function(user) {
	 usuarios[user].fichas = getDomino(user);
});

 function domino() {
	 return "++ Fichas creadas";
 }

 function getDomino(user) {
	 fichas = [];
	 usuarios[user].fichas = [];
	 while(cont < 5) {
		let a = Math.floor(Math.random()*(28-0))-0;
		 if( ((fichas.indexOf(dom[a])) === -1) && (fichasS.indexOf(dom[a])) === -1 ) {
			fichas.push(dom[a]);
			fichasS.push(dom[a]);
			cont++;
		 }
	 }
	 cont=0;
	 return fichas;
 }
 function reset(user) {
	delete usuarios[user].fichas;
	fichas = [];
	fichasS = [];
	fichasR = [];
	cont = 0;
	return "-- Eliminando fichas";
 }

 function server() {
	 for (let x = 0; x < 28; x++) {
		 if ( fichasS.indexOf(dom[x]) === -1 ) {
			 fichasR.push(dom[x]);
		 }
	 }
	 return fichasR;
 }
function seeDom(user) {
	return usuarios[user].fichas;
}
