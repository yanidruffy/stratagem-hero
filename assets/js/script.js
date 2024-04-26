let stratagemName = "";
let sequence = "";
let gameStarted = false;
let userInput = "";
let arrows = [];
let round = document.getElementById("round");
let time = document.getElementById("time");

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

function checkUserInput() {
	console.log("Arrows before check: ", arrows);
	if (arrows.length > 0 && userInput === arrows[0]) {
		console.log("Correct");
		arrows.shift();
		if (arrows.length === 0) {
			console.log("Next Round");
			let num = Math.floor(Math.random() * 4);
			displayStratagem(num);
			round.innerHTML = parseInt(round.innerHTML) + 1;
			time.innerHTML = "10";
		}
	} else {
		console.log("Incorrect. Game Over");
		gameStarted = false;
		defaultStart();
	};
};

function compareUserInput(event) {
	userInput = event.key;
	console.log("User Input: ", userInput);
	checkUserInput();
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
	return arrow.trim();
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
	arrows = arrowSequence(sequence).split(" ");
	console.log("SequenceArrow: ", arrows);
}

function startGame() {
	gameStarted = true;
	document.getElementById("hidden").innerHTML = "";
	round.innerHTML = "1";
	time.innerHTML = "10";
	let num = Math.floor(Math.random() * 4);
	displayStratagem(num);
};

function defaultStart() {
	document.getElementById("stratagem").innerHTML = "Stratagem";
	document.getElementById("hidden").innerHTML = "Press any stratagem to start";
	round.innerHTML = "0";
	time.innerHTML = "0";
}

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
			console.log("Start Game");
		} else if (gameStarted && event.key.startsWith("Arrow")){
			compareUserInput(event);
		} else {
			defaultStart();
		};
	});
});
