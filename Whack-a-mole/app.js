const squares = document.querySelectorAll(".square");
const mole = document.querySelector(".mole");
const timeLeft = document.querySelector("#timer");
const score = document.querySelector("#score");

let result = 0;
let hitPosition;
let countDownTimer = 60;
let timerId = null;

function randomSquare() {
  squares.forEach((square) => {
    square.classList.remove("mole");
  });

  const randomSquare = squares[Math.floor(Math.random() * 9)];
  randomSquare.classList.add('mole')

  hitPosition = randomSquare.id
}

squares.forEach(square => {
	square.addEventListener('mousedown', () => {
		if(square.id === hitPosition) {
			result++;
			score.innerHTML = result;
			hitPosition = null;
		}
	}) 
}) 

function moveMole() {
	timerId = setInterval(randomSquare, 1000) 
}

randomSquare();
moveMole();

function countDown() {
	countDownTimer--;
	timeLeft.innerHTML = countDownTimer;

	if(countDownTimer === 0) {
		clearInterval(countDownTimerId)
		clearInterval(timerId); 
		alert("Your time is up, your score is: " +  result)
	}
}

let countDownTimerId = setInterval(countDown, 1000)