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

// Function to change character in a String
function changeChar(index, str, toChange){
	return str.substring(0, index) + toChange + str.substring(index+1, str.length);
}

/* 	Function to put the Dominoe in the map
 *	vPos: Vertical Position on the map
 *	hPos: Horizontal Position on the map
 *	ficha: 'ficha' to put on the map
 *	pos: the 'Up' 'Down' 'Right' 'Left' Position of the 'ficha'
*/
function goTest(vPos, hPos, ficha, pos){
	switch(pos){
		case "U":
			map[vPos]   = changeChar(hPos, map[vPos], ficha);
			map[vPos-1] = changeChar(hPos, map[vPos], ficha);
			break;

		case "D":
			map[vPos]   = changeChar(hPos, map[vPos], ficha);
			map[vPos+1] = changeChar(hPos, map[vPos], ficha);
			break;

		case "R":
			map[vPos] = changeChar(hPos  , map[vPos], ficha);
			map[vPos] = changeChar(hPos+1, map[vPos], ficha);
			break;

		case "L":
			map[vPos] = changeChar(hPos  , map[vPos], ficha);
			map[vPos] = changeChar(hPos-1, map[vPos], ficha);
			break;
	}
}



for(var i = map.length-1; i > 0; i--){
	console.log(map[i].charAt(i*3));
}

/*
for(var i = 0; i < 5; i++){
	map[i] = changeChar(i, map[i], ""+(i+1));
}*/

goTest(2-1, 20, "1", "U");
goTest(3-1, 20, "2", "D");
goTest(5-1, 20, "3", "R");
goTest(6-1, 20, "4", "L");

console.log(map);