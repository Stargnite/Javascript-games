const computerChoiceDisplay = document.getElementById("computer-choice");
const userChoiceDisplay = document.getElementById("user-choice");
const resultDisplay = document.getElementById("result-display");
const buttons =document.querySelectorAll('button');
let userChoice
let computerChoice
let result


buttons.forEach(button => {
addEventListener("click", (e) => {
	userChoice = e.target.id
	userChoiceDisplay.textContent = userChoice
	computerDecision();
})})

function computerDecision() {
	const randomNumber = Math.floor(Math.random() * buttons.length) + 1

	if(randomNumber === 1) {
		computerChoice = "rock"
	}
	if(randomNumber === 2) {
		computerChoice = "paper"
	}
	if(randomNumber === 3) {
		computerChoice = "scissors"
	}
	computerChoiceDisplay.innerHTML = computerChoice;
	getResult();
}


const getResult = () => {
	if(computerChoice === userChoice) {
		result = "Its a draw!"
	}

	if(computerChoice === "rock" && userChoice === "paper") {
		result = "User wins!"
	}

	if(computerChoice === "paper" && userChoice === "rock") {
		result = "computer wins!"
	}

	if(computerChoice === "scissors" && userChoice === "rock") {
		result = "User wins!"
	}

	if(computerChoice === "rock" && userChoice === "scissors") {
		result = "computer wins!"
	}

	if(computerChoice === "scissors" && userChoice === "paper") {
		result = "computer wins"
	}

	if(computerChoice === "paper" && userChoice === "scissors") {
		result = "User wins"
	}

	resultDisplay.innerHTML = result;
}

