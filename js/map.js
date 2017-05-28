// This the Domino's board map 
let map = [ "                                        ",
			"                                        ",
			"                                        ",
			"                                        ",
			"                                        ",
			"                                        ",
			"                                        ",
			"                                        ",
			"                                        ",
			"                                        ",
			"                                        ",
			"                                        " ];

let vRPos = 5; // Vertical Right Position
let hRPos = 21; // Horizontal Right Position

let vLPos = 5; // Vertical Left Position
let hLPos = 19; // Horizontal Left Position



// Function to change character in a String
function changeChar(index, str, toChange){
	return str.substring(0, index) + toChange + str.substring(index+1, str.length);
}

/* 	Function to put the Dominoe in the map
 *	vPos: Vertical Position on the map
 *	hPos: Horizontal Position on the map
 *	ficha: 'ficha' to put on the map
 *	pos: the 'Up' 'Down' 'Right' 'Left' Position for the next side of 'ficha'
*/
function dominoToMap(vPos, hPos, ficha, pos){
	switch(pos){
		case "U": 
			if ( map[vPos-1].charAt(hPos) === " " ){
				map[vPos]   = changeChar(hPos, map[vPos], ficha);
				map[vPos-1] = changeChar(hPos, map[vPos], ficha);
			}else{
				console.log("This action is not allowed");
			}
			break;

		case "D":
			if (  map[vPos+1].charAt(hPos) === " " ){
				map[vPos]   = changeChar(hPos, map[vPos], ficha);
				map[vPos+1] = changeChar(hPos, map[vPos], ficha);
			}else{
				console.log("This action is not allowed");
			}
			break;

		case "R":
			if (  map[vPos].charAt(hPos+1) === " " ){
				map[vPos] = changeChar(hPos  , map[vPos], ficha);
				map[vPos] = changeChar(hPos+1, map[vPos], ficha);
			}else{
				console.log("This action is not allowed");
			}
			break;

		case "L":
			if (  map[vPos].charAt(hPos-1) === " " ){
				map[vPos] = changeChar(hPos  , map[vPos], ficha);
				map[vPos] = changeChar(hPos-1, map[vPos], ficha);
			}else{
				console.log("This action is not allowed");
			}
			break;
	}
}

console.log(map);