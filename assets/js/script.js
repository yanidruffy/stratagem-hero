let sequence = "";
let gameStarted = false;
let userInput = "";
let arrows = [];
const round = document.getElementById("round");
const time = document.getElementById("time");
const startingTime = 10;
let timeInterval;
let score;
let stratagemCount;
let stratagemsCompleted;

/**
 * function to keep track of high score
 */
function highScore() {
	let highScore = document.getElementById("score");
	if (score > parseInt(highScore.innerHTML)) {
		highScore.innerHTML = score;
	} else {
		highScore.innerHTML = highScore.innerHTML;
	}
}

/**
 * function to end the game
 */
function gameOver() {
	clearInterval(timeInterval);
	alert("Game Over.\n Your score is " + score + "\n Last Input: " + userInput + "\n Expected Input: " + arrows[0] + "\n Time Left: " + time.innerHTML + " seconds");
	gameStarted = false;
	highScore();
	resetGame();
}

/**
 * function to start the timer
 * @param {number} startingTime
 */
function startTimer(startingTime) {
	let countdown = startingTime;

	time.innerHTML = countdown;
	timeInterval = setInterval(function () {
		countdown -= 1;
		time.innerHTML = countdown;
		if (countdown === 0) {
			gameOver();
		}
	}, 1000);
}

/**
 * function to generate stratagem
 */
function stratagemGenerator() {
	let num = Math.floor(Math.random() * stratagems.length);
	displayStratagem(num);
}

/**
 * function to check user input against the sequence
 */
function checkUserInput() {
	if (arrows.length > 0 && userInput === arrows[0]) {
		document.getElementById(`icon-${sequence.length - arrows.length}`).classList.add("correct");
		arrows.shift();
		score += 1;
		if (arrows.length === 0) {
			stratagemsCompleted += 1;
			if (stratagemsCompleted === stratagemCount) {
				round.innerHTML = parseInt(round.innerHTML) + 1;
				stratagemsCompleted = 0;
				stratagemCount += 1;
				clearInterval(timeInterval);
				startTimer(startingTime);
			}
			stratagemGenerator();
		}
	} else {
		gameOver();
	}
}

/**
 * function to convert sequence to arrow keys
 * @param {string} sequence
 * @returns {string}
 */
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
		arrow += arrowKey.toLowerCase() + " ";
	}
	return arrow.trim();
}

/**
 * function for UI to display the sequence with symbols
 * @param {*} sequence
 */
function symbolSequence(sequence) {
	let symbol = ""; // Reset symbol variable to empty string

	for (let i = 0; i < sequence.length; i++) {
		let symbolIcon = "";
		let iconClass = "";
		if (sequence[i] === "u") {
			iconClass = "fa-circle-arrow-up";
		} else if (sequence[i] === "r") {
			iconClass = "fa-circle-arrow-right";
		} else if (sequence[i] === "l") {
			iconClass = "fa-circle-arrow-left";
		} else if (sequence[i] === "d") {
			iconClass = "fa-circle-arrow-down";
		}
		symbolIcon = `<i class="fa-solid ${iconClass}" id="icon-${i}"></i>`;
		symbol += symbolIcon + " ";
	}
	document.getElementById("stratagem-combo").innerHTML = symbol.trim();
}

/**
 * function for UI to display stratagem based on its index in the array
 * @param {number} index
 */
function displayStratagem(index) {
	let stratagem = stratagems[index];

	document.getElementById("stratagem").innerHTML = stratagem.stratagemName;
	sequence = stratagem.sequence;
	symbolSequence(sequence);
	arrows = arrowSequence(sequence).split(" ");
}

/**
 * function to start the game
 */
function startGame() {
	gameStarted = true;
	document.getElementById("instruction").innerHTML = "Input the correct sequence to successfully complete the stratagem.";
	round.innerHTML = "1";
	time.innerHTML = "10";
	score = 0;
	stratagemCount = 1;
	stratagemsCompleted = 0;
	startTimer(startingTime);
	stratagemGenerator();
}

/** function to handle user input during the game
 * @param {string} key
 */
function handleUserInput(key) {
	userInput = key;
	checkUserInput();
}

/**
 * function to reset game to default
 */
function resetGame() {
	document.getElementById("stratagem").innerHTML = "Start Game";
	document.getElementById("instruction").innerHTML = "Press any arrow key or button to start";
	document.getElementById("stratagem-combo").innerHTML = "";
	round.innerHTML = "0";
	time.innerHTML = "0";
}

// wait for DOM to load
document.addEventListener("DOMContentLoaded", function () {

	const buttons = document.getElementsByClassName("btn");
	for (const button of buttons) {
		button.addEventListener("click", function () {
			if (!gameStarted) {
				startGame();
			} else if (gameStarted) {
				let arrowKey = button.dataset.type.replace("arrow-", "arrow");
				handleUserInput(arrowKey);
			}
		});
	}

	document.addEventListener("keydown", function (event) {
		if (!gameStarted && event.key.startsWith("Arrow")) {
			startGame();
		} else if (gameStarted && event.key.toLowerCase().startsWith("arrow")) {
			handleUserInput(event.key.toLowerCase());
		}
	});
});
