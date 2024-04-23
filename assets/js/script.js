let stratagemName = "";

// wait for DOM to load
document.addEventListener("DOMContentLoaded", function() {

	let buttons = document.getElementsByClassName("btn");
	for (let button of buttons) {
		button.addEventListener("click", function() {
			startGame();
		})
	}

	document.addEventListener("keydown", function(event) {
		if (event.key.startsWith("Arrow")) {
			startGame();
		}
	})
});

function startGame() {
	document.getElementById("hidden").innerHTML = "";
	alert("Game Started!");

	let num = 0;
	// let num = Math.floor(Math.random() * 2);

	displayStratagem(num);
};

function displayStratagem(num) {
	if (num === 0) {
		stratagemName = "500kg Bomb";
		document.getElementById("stratagem").innerHTML = stratagemName;
	}
}
