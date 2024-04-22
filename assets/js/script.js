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

	function startGame() {
		document.getElementById("hidden").innerHTML = "";
		alert("Game Started!");
	}

});

