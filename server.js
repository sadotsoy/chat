// This the Domino's board map 
let map = [ "                                                                                ",
			"                                                                                ",
			"                                                                                ",
			"                                                                                ",
			"                                                                                ",
			"                                                                                ",
			"                                                                                ",
			"                                                                                ",
			"                                                                                ",
			"                                                                                ",
			"                                                                                ",
			"                                                                                ",
			"                                                                                ",
			"                                                                                ",
			"                                                                                ",
			"                                                                                ",
			"                                                                                ",
			"                                                                                ",
			"                                                                                ",
			"                                                                                " ];

let vRPos = 9; // Start Vertical Right Position
let hRPos = map[0].length/2 +1; // Start Horizontal Right Position

let vLPos = 9; // Start Vertical Left Position
let hLPos = map[0].length/2 -1; // Start Horizontal Left Position

let lVLPos = 0; // Last Vertical left Position Accepted
let lHLPos = 0; // Last Horizontal Left Position Accepted

let lVRPos = 0; // Last Vertical Right Position Accepted
let lHRPos = 0; // Last Horizontal Right Position Accepted

let lDRPos = "R"; // Last Direction Right Position
let lDLPos = "L"; // Last Direction Left Position

let start = false; // Game State

let playerTurn = 0; // Player with turn 




// Dominoe chips 0,0 to 6,6
let dom = [
    '0,0',
    '0,1',
    '0,2',
    '0,3',
    '0,4',
    '0,5',
    '0,6',
    '1,1',
    '1,2',
    '1,3',
    '1,4',
    '1,5',
    '1,6',
    '2,2',
    '2,3',
    '2,4',
    '2,5',
    '2,6',
    '3,3',
    '3,4',
    '3,5',
    '3,6',
    '4,4',
    '4,5',
    '4,6',
    '5,5',
    '5,6',
    '6,6' ];




const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

let usuarios = {};
let fichas = [], fichasS = [], fichaR = [];
let cont = 0;

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'public', 'index.html');

const server = express()
	.use(express.static(path.join(__dirname)))
	.use((req, res) => res.sendFile(INDEX))
	.listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

io.on('connection', (socket) => {
	// Print the message in the chat
	socket.on('chatMessage', (from, msg) => {
		io.emit('chatMessage', from, msg);
	});

	//Notify who is the typing user
	socket.on('notifyUser', (user) => {
		io.emit('notifyUser', user);
	});

	socket.on('saveUser', (user) => {
		fichas = [];
		usuarios[user] = {};
		usuarios[user].fichas = [];
		usuarios[user].tfichas = 0;
		usuarios[user].lUficha = -1;
		usuarios[user].turno = -1;
	});

	socket.on('sendDomino', (user) => {
		getDomino(user);
	});

	socket.on('serverDomino', (user, message) => {
		message = serverDomino();
		io.emit('serverDomino', user, "Ficha restante: "+message);
	});

	socket.on('showDomino', (user, message) => {
		message = ""; // clean the message, you have a "giveme" before this
		for(var idx = 0; idx < 9; idx++){ // Saving in 'message' all the domino chips
			message += showDomino(user, idx);
		}
		io.emit('showDomino', user, "Tus fichas son: "+message);
	});

	//Moving the domino chips
	socket.on('move', (user, message) => {
		if( usuarios[user].turno === playerTurn){

			let chip = parseInt(message.charAt(3)) - 1; // Get the message position of chip
			let side = message.charAt(5); // Get the side to put the chip
			let pos  = message.charAt(7); // Get the position to put the chip

			usuarios[user].lUficha = chip;
			
			if( side == "l" || side == "L" ){

				/*console.log(map[lVLPos].charAt(lHLPos));
				 *console.log(map[lVLPos].charAt(lHLPos+2));
				 *console.log(lVLPos);
				 *console.log(lHLPos);
				*/

				// Checking if any of the numbers equals to the last Left chip's number and know what possition to take
				if( parseInt(usuarios[user].fichas[chip].charAt(0)) === parseInt( map[lVLPos].charAt(lHLPos)) ){
					chip = reverseString(usuarios[user].fichas[chip]);

					hLPos -= 2;
					dominoToMap(user, lVLPos, lHLPos, "L", chip, pos);

				}else if( parseInt(usuarios[user].fichas[chip].charAt(2)) === parseInt( map[lVLPos].charAt(lHLPos)) ){
					chip = usuarios[user].fichas[chip];

					hLPos -= 2;
					dominoToMap(user, lVLPos, lHLPos, "L", chip, pos);

				}else{
					//console.log(usuarios[user].fichas[chip]);
					console.log("Not a valid chip");
				}

			}else if( side == "r" || side == "R" ){

				// Checking if any of the numbers equals to the last Right chip's number

				/*console.log(map[lVRPos].charAt(lHRPos-2));
				 *console.log(map[lVRPos].charAt(lHRPos));
				 *console.log(lVRPos);
				 *console.log(lHRPos);
				*/

				// Checking if any of the numbers equals to the last Left chip's number and know what possition to take
				if( parseInt(usuarios[user].fichas[chip].charAt(0)) === parseInt( map[lVRPos].charAt(lHRPos)) ){
					chip = usuarios[user].fichas[chip]

					hRPos += 2;
					dominoToMap(user, lVRPos, lHRPos, "R", chip, pos);

				}else if( parseInt(usuarios[user].fichas[chip].charAt(2)) === parseInt( map[lVRPos].charAt(lHRPos)) ){ 
					chip = reverseString(usuarios[user].fichas[chip]);

					hRPos += 2;
					dominoToMap(user, lVRPos, lHRPos, "R", chip, pos);

				}else{
					//console.log(usuarios[user].fichas[chip]);
					console.log("Not a valid chip");
				}
			}
		}else{
			io.emit('showDomino', user, " <<-- Sorry it is not your turn ");
		}

	});

	socket.on('turn', (user) =>{
		var turn = -1;

		for(var t in usuarios ){
			console.log(t);
			if( t.turno == playerTurn){

			}
		}

		io.emit('showDomino', 'System', "It is " + playerTurn + " Turn");
	});

	socket.on('pass', (user) =>{
		if( usuarios[user].turno === playerTurn){
			playerTurn += 1;
			io.emit('showDomino', user, " <<-- You have passed you turn");
		}else{
			io.emit('showDomino', user, " <<-- Sorry it is not your turn");
		}
	});

	socket.on('reset', (user) => {
		let chip = fichasS[0];

		dominoToMap(user, vRPos, hRPos, "R", chip, "R");

		playerTurn = 0;

		lVLPos = lVRPos;
		lHLPos = lHRPos-2;
	});

	socket.on('start', (user, message) => {
		getDomino(user);
	});

	// Print Map
	socket.on('showMap', (user) => {

		io.emit('showDomino', 'Board', map[7]);
		io.emit('showDomino', 'Board', map[8]);
		io.emit('showDomino', 'Board', map[9]);
		io.emit('showDomino', 'Board', map[10]);
	});

});


function reverseString(str) {
    // Step 1. Use the split() method to return a new array
    var splitString = str.split(""); // var splitString = "hello".split("");
    // ["h", "e", "l", "l", "o"]
 
    // Step 2. Use the reverse() method to reverse the new created array
    var reverseArray = splitString.reverse(); // var reverseArray = ["h", "e", "l", "l", "o"].reverse();
    // ["o", "l", "l", "e", "h"]
 
    // Step 3. Use the join() method to join all elements of the array into a string
    var joinArray = reverseArray.join(""); // var joinArray = ["o", "l", "l", "e", "h"].join("");
    // "olleh"
    
    //Step 4. Return the reversed string
    return joinArray; // "olleh"
}


// Gives domino chips to "fichas" and "fichasS"
function getDomino(user) {
	while(cont < 9) {
		let a = Math.floor(Math.random()*(28-0))-0;
		if ( ((fichas.indexOf(dom[a])) === -1) && ((fichasS.indexOf(dom[a])) === -1) ) {
			fichas.push(dom[a]);
			fichasS.push(dom[a]);
			cont++;
		}
	}
	cont = 0;
	usuarios[user].fichas = fichas; // Assign the player's domino chips
	usuarios[user].tfichas = fichas.length; // Assign the player's total domino chips
	if(playerTurn < 2){
		usuarios[user].turno = playerTurn++; // Assign the player turn and increment
	}

	//console.log(usuarios);
}


function serverDomino() {
	cont = 0;
	fichaR = [];
	while(cont < 28) {
		if( (fichasS.indexOf(dom[cont])) === -1 ) {
			fichaR.push(dom[cont]);
		}
		cont++;
	}
	return fichaR;
}

// Return a domino chip given by the user and the number of chip(idx)
function showDomino(user, idx) {
	return (idx+1) + ":[" + usuarios[user].fichas[idx] + "] ";
}

// Function to change character in a String
function changeChar(index, str, toChange){
	return str.substring(0, index) + toChange + str.substring(index+1, str.length);
}

/* 	Function to put the Dominoe in the map
 *	vPos : Vertical Position on the map
 *	hPos : Horizontal Position on the map
 * 	dir  : Direction
 *	ficha: 'ficha' to put on the map
 *	pos  : the 'Up' 'Down' 'Right' 'Left' Position for the next side of 'ficha'
*/
function dominoToMap(user, vPos, hPos, dir, ficha, pos){

	let passTurn = false;

	let chipL = ficha.charAt(0); // Domino chip Left side
	let chipR = ficha.charAt(2); // Domino chip Right side

	pos = pos.toUpperCase();
	switch(pos){
		case "U": 
			if ( map[vPos-1].charAt(hPos) === " " ){ // Check if field is empty
				if(start){
					if( dir === "L"){
						switch(lDLPos){
							case "U":
								break;

							case "D":
								break;

							case "R":
								break;

							case "L":
								break;
						}
						hPos -= 3;
					}
					else if( dir === "R"){
						switch(lDRPos){
							case "U":
								break;

							case "D":
								break;

							case "R":
								break;

							case "L":
								break;
						}
						hPos += 3;
					}
				}

				map[vPos]   = changeChar(hPos-1, map[vPos], "[");
				map[vPos]   = changeChar(hPos  , map[vPos], chipL);
				map[vPos]   = changeChar(hPos+1, map[vPos], "]");
				
				map[vPos-1] = changeChar(hPos-1, map[vPos-1], "[");
				map[vPos-1] = changeChar(hPos  , map[vPos-1], chipR);
				map[vPos-1] = changeChar(hPos+1, map[vPos-1], "]");

				if(dir === "L" ){
					lHLPos = hPos;
					lVLPos = vPos-1;
				}else if ( dir === "R" ){
					lHRPos = hPos;
					lVRPos = vPos-1;
				}

				usuarios[user].tfichas -= 1; // Decrease the user's domino chip counter;
				delete usuarios[user].fichas[usuarios[user].lUficha-1]; // delete the user's domino chip used

				passTurn = true;

			}else{
				console.log("This action is not allowed");
			}
			break;

		case "D":
			if (  map[vPos+1].charAt(hPos) === " " ){ // Check if field is empty
				if(start){
					if( dir === "L"){
						hPos -= 3;
					}
					else if( dir === "R" ){
						hPos += 3;
					}
				}

				map[vPos]   = changeChar(hPos-1, map[vPos], "[");
				map[vPos]   = changeChar(hPos  , map[vPos], chipL);
				map[vPos]   = changeChar(hPos+1, map[vPos], "]");

				map[vPos+1] = changeChar(hPos-1, map[vPos+1], "[");
				map[vPos+1] = changeChar(hPos  , map[vPos+1], chipR);
				map[vPos+1] = changeChar(hPos+1, map[vPos+1], "]");

				if(dir === "L" ){
					lHLPos = hPos;
					lVLPos = vPos+1;
				}else if ( dir === "R" ){
					lHRPos = hPos;
					lVRPos = vPos+1;
				}

				usuarios[user].tfichas--; // Decrease the user's domino chip counter;
				delete usuarios[user].fichas[usuarios[user].lUficha]; // delete the user's domino chip used

				passTurn = true;

			}else{
				console.log("This action is not allowed");
			}
			break;

		case "R":
			if (  map[vPos].charAt(hPos+2) === " " ){ // Check if field is empty
				if(start){
					hPos += 3;
				}

				map[vPos] = changeChar(hPos-1, map[vPos], "[");
				map[vPos] = changeChar(hPos  , map[vPos], chipL);
				map[vPos] = changeChar(hPos+1, map[vPos], "|");
				map[vPos] = changeChar(hPos+2, map[vPos], chipR);
				map[vPos] = changeChar(hPos+3, map[vPos], "]");

				if(dir === "L" ){
					lHLPos = hPos+2;
					lVLPos = vPos;
				}else if ( dir === "R" ){
					lHRPos = hPos+2;
					lVRPos = vPos;
				}

				usuarios[user].tfichas--; // Decrease the user's domino chip counter;
				//delete usuarios[user].fichas[usuarios[user].lUficha]; // delete the user's domino chip used
				usuarios[user].fichas.splice(usuarios[user].lUficha);

				passTurn = true;

			}else{
				console.log("This action is not allowed");
			}
			break;

		case "L":
			if (  map[vPos].charAt(hPos-2) === " " ){ // Check if field is empty
				if (start){
					hPos -= 3;
				}

				map[vPos] = changeChar(hPos-3, map[vPos], "[");
				map[vPos] = changeChar(hPos-2, map[vPos], chipL);
				map[vPos] = changeChar(hPos-1, map[vPos], "|");
				map[vPos] = changeChar(hPos  , map[vPos], chipR);
				map[vPos] = changeChar(hPos+1, map[vPos], "]");

				if(dir === "L" ){
					lHLPos = hPos-2;
					lVLPos = vPos;
				}else if ( dir === "R" ){
					lHRPos = hPos-2;
					lVRPos = vPos;
				}

				usuarios[user].tfichas--; // Decrease the user's domino chip counter;
				delete usuarios[user].fichas[usuarios[user].lUficha]; // delete the user's domino chip used

				passTurn = true;

			}else{
				console.log("This action is not allowed");
			}
			break;

		default:
			console.log("Bad Function Composition");
	}

	if (!start){ // If game hasn't started then start
		start = !start;
	}
	if( passTurn ){
		if(playerTurn === 2){
			playerTurn = 0;
		}else{
			playerTurn += 1;
		}
	}

	console.log(map);
}



