let stratagemName = "";
let sequence = "";
let gameStarted = false;
let userInput = "";

// array of stratagems containing multiple objects
let stratagems = [
	{
		stratagemName: "500kg Bomb",
		sequence: "urddd"
	},
	{
		stratagemName: "Eagle 110mm Rocket Pods",
		sequence: "urul"
	},
	{
		stratagemName: "Eagle Smoke Strike",
		sequence: "urud"
	},
	{
		stratagemName: "Eagle Napalm Airstrike",
		sequence: "urdu"
	}
];

function storeUserInput(event) {
	userInput = event.key;
	console.log("User Input: ", userInput);
}

// convert sequence to arrow keys
function arrowSequence(sequence) {
	let arrow = "";

	for (let i = 0; i < sequence.length; i++) {
		let arrowKey = "";

		if (sequence[i] === "u") {
			arrowKey = "ArrowUp";
		} else if (sequence[i] === "r") {
			arrowKey = "ArrowRight";
		} else if (sequence[i] === "l") {
			arrowKey = "ArrowLeft";
		} else if (sequence[i] === "d") {
			arrowKey = "ArrowDown";
		}
		arrow += arrowKey + " ";
	}
	console.log("Arrow Keys: ", arrow);
	return arrow;
}

// display the sequence with symbols
function symbolSequence(sequence) {
	let symbol = ""; // Reset symbol variable to empty string

	console.log("Sequence: ", sequence);
	for (let i = 0; i < sequence.length; i++) {
		let symbolIcon = "";

		if (sequence[i] === "u") {
			symbolIcon = '<i class="fa-solid fa-circle-arrow-up"></i>';
		} else if (sequence[i] === "r") {
			symbolIcon = '<i class="fa-solid fa-circle-arrow-right"></i>';
		} else if (sequence[i] === "l") {
			symbolIcon = '<i class="fa-solid fa-circle-arrow-left"></i>';
		} else if (sequence[i] === "d") {
			symbolIcon = '<i class="fa-solid fa-circle-arrow-down"></i>';
		}
		symbol += symbolIcon + " ";
	}
	console.log("Symbol: ", symbol);
	document.getElementById("stratagem-combo").innerHTML = symbol;
}

// function to display stratagem based on its index in the array
function displayStratagem(index) {
	let stratagem = stratagems[index];

	document.getElementById("stratagem").innerHTML = stratagem.stratagemName;
	sequence = stratagem.sequence;
	symbolSequence(sequence);
}

function startGame() {
	document.getElementById("hidden").innerHTML = "";

	let num = Math.floor(Math.random() * 4);
	displayStratagem(num);
	let arrows = arrowSequence(sequence).split(" ");
	console.log("SequenceArrow ", arrows);
};

// wait for DOM to load
document.addEventListener("DOMContentLoaded", function() {

	// let buttons = document.getElementsByClassName("btn");
	// for (let button of buttons) {
	// 	button.addEventListener("click", function() {
	// 		startGame();
	// 	})
	// }

	document.addEventListener("keydown", function(event) {
		if (!gameStarted && event.key.startsWith("Arrow")) {
			startGame();
			gameStarted = true;
			console.log("Start Game");
		} else {
			storeUserInput(event);
		}
	});
});
