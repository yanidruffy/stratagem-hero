let stratagemName = "";
let sequence = [];

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

// function to display stratagem based on its index in the array
function displayStratagem(index) {
	let stratagem = stratagems[index];

	document.getElementById("stratagem").innerHTML = stratagem.stratagemName;
	document.getElementById("stratagem-combo").innerHTML = stratagem.sequence;
}

function startGame() {
	document.getElementById("hidden").innerHTML = "";

	let num = Math.floor(Math.random() * 4);
	displayStratagem(num);
};

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
