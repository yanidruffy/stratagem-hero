let sequence = "";
let gameStarted = false;
let userInput = "";
let arrows = [];
let round = document.getElementById("round");
let time = document.getElementById("time");
let startingTime = 10;
let timeInterval;
let score;
let stratagemCount;
let stratagemsCompleted;

// function to keep track of high score
function highScore() {
	let highScore = document.getElementById("score");
	if (score > parseInt(highScore.innerHTML)) {
		highScore.innerHTML = score;
	} else {
		highScore.innerHTML = highScore.innerHTML;
	};
	console.log("High Score: ", highScore.innerHTML);
};

// function to end the game
function gameOver() {
	clearInterval(timeInterval);
	alert("Game Over.\n Your score is " + score + "\n Last Input: " + userInput + "\n Expected Input: " + arrows[0] + "\n Time Left: " + time.innerHTML + " seconds");
	gameStarted = false;
	highScore();
	resetGame();
}

// function to start the timer
function startTimer(startingTime) {
	let countdown = startingTime;

	time.innerHTML = countdown;
	timeInterval = setInterval(function() {
		countdown -= 1;
		time.innerHTML = countdown;
		if (countdown === 0) {
			console.log("Time's Up");
			gameOver();
		}
	}, 1000);
};

// function to generate stratagem
function stratagemGenerator() {
	let num = Math.floor(Math.random() * 47);
	displayStratagem(num);
};

// function to check user input against the sequence
function checkUserInput() {
	console.log("Arrows before check: ", arrows);
	if (arrows.length > 0 && userInput === arrows[0]) {
		console.log("Correct");
		document.getElementById(`icon-${sequence.length - arrows.length}`).classList.add("correct");
		arrows.shift();
		score += 1;
		console.log(score);
		if (arrows.length === 0) {
			console.log("Stratagem Complete");
			stratagemsCompleted += 1;
			console.log("Stratagems Completed: ", stratagemsCompleted);
			if (stratagemsCompleted === stratagemCount) {
				console.log("Round Complete");
				round.innerHTML = parseInt(round.innerHTML) + 1;
				console.log("Current Round: ", round.innerHTML);
				stratagemsCompleted = 0;
				stratagemCount += 1;
				clearInterval(timeInterval);
				startTimer(startingTime);
			}
			stratagemGenerator();
		}
	} else {
		gameOver();
	};
};

// function to convert sequence to arrow keys
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
	console.log("Arrow Keys: ", arrow);
	return arrow.trim();
}

// function for UI to display the sequence with symbols
function symbolSequence(sequence) {
	let symbol = ""; // Reset symbol variable to empty string

	console.log("Sequence: ", sequence);
	for (let i = 0; i < sequence.length; i++) {
		let symbolIcon = "";
		let iconClass = "";
		if (sequence[i] === "u") {
			iconClass = "fa-circle-arrow-up"
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
	console.log("Symbol: ", symbol);
	document.getElementById("stratagem-combo").innerHTML = symbol.trim();
}

// function for UI to display stratagem based on its index in the array
function displayStratagem(index) {
	let stratagem = stratagems[index];

	document.getElementById("stratagem").innerHTML = stratagem.stratagemName;
	sequence = stratagem.sequence;
	symbolSequence(sequence);
	arrows = arrowSequence(sequence).split(" ");
	console.log("SequenceArrow: ", arrows);
}

// function to start the game
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
};

// function to handle user input during the game
function handleUserInput(key) {
	console.log("Type of input: ", typeof key);
	userInput = key;
	console.log("User Input: ", userInput);
	checkUserInput();
}

// function to reset game to default
function resetGame() {
	document.getElementById("stratagem").innerHTML = "Start Game";
	document.getElementById("instruction").innerHTML = "Press any arrow key or button to start";
	document.getElementById("stratagem-combo").innerHTML = "";
	round.innerHTML = "0";
	time.innerHTML = "0";
}

// wait for DOM to load
document.addEventListener("DOMContentLoaded", function() {

	let buttons = document.getElementsByClassName("btn");
	for (let button of buttons) {
		button.addEventListener("click", function() {
			if (!gameStarted) {
				startGame();
				console.log("Start Game");
			} else if (gameStarted) {
				let arrowKey = button.dataset.type.replace("arrow-", "arrow");
				console.log("Type of Button: ", typeof arrowKey);
				console.log("Button: ", arrowKey);
				handleUserInput(arrowKey);
			}
		});
	};

	document.addEventListener("keydown", function(event) {
		if (!gameStarted && event.key.startsWith("Arrow")) {
			startGame();
			console.log("Start Game");
		} else if (gameStarted && event.key.toLowerCase().startsWith("arrow")){
			handleUserInput(event.key.toLowerCase());
			console.log("Type of Keyboard: ", typeof event.key.toLowerCase());
			console.log("User Input Keyboard: ", event.key.toLowerCase());
		}
	});
});
