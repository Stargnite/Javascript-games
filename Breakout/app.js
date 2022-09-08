const grid = document.querySelector(".grid");
const scoreBoard = document.querySelector(".score");
let score = 0;

const blockWidth = 100;
const blockHeight = 20;

const currentPosition = [230, 30]; // user board position
const boardWidth = 560; // user board board
const boardHeight = 400;

const ballDiameter = 20;
const ballPosition = [270, 55];
let xDirection = 2;
let yDirection = 2;
let timerId;


const startBtn = document.querySelector('.activate');

startBtn.addEventListener('click', () => {
  grid.classList.add('grid-display')
  activateGame()
  startBtn.classList.add('remove-btn')
})


function activateGame(){

  class Block {
    constructor(xAxis, yAxis) {
      this.bottomLeft = [xAxis, yAxis];
      this.bottomRight = [xAxis + blockWidth, yAxis];
      this.topLeft = [xAxis, yAxis + blockHeight];
      this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
    }
  }
  
  // all blocks...
  const blocks = [
    new Block(10, 370),
    new Block(120, 370),
    new Block(230, 370),
    new Block(340, 370),
    new Block(450, 370),
  
    new Block(10, 340),
    new Block(120, 340),
    new Block(230, 340),
    new Block(340, 340),
    new Block(450, 340),
  
    new Block(10, 310),
    new Block(120, 310),
    new Block(230, 310),
    new Block(340, 310),
    new Block(450, 310),
  ];
  
  // Draw a block and add it to the grid...
  function addBlocks() {
    for (let i = 0; i < blocks.length; i++) {
      const block = document.createElement("div");
      block.classList.add("block");
      block.style.left = blocks[i].bottomLeft[0] + "px";
      block.style.bottom = blocks[i].bottomLeft[1] + "px";
      grid.appendChild(block);
    }
  }
  addBlocks();
  
  //  add userblock...
  const user = document.createElement("div");
  user.classList.add("user");
  grid.appendChild(user);
  drawUser();
  
  // draw user
  function drawUser() {
    user.style.left = currentPosition[0] + "px";
    user.style.bottom = currentPosition[1] + "px";
  }
  
  // draw ball
  function drawBall() {
    ball.style.left = ballPosition[0] + "px";
    ball.style.bottom = ballPosition[1] + "px";
  }
  
  //move user
  function moveUser(e) {
    switch (e.key) {
      case "ArrowLeft":
        if (currentPosition[0] > 0) {
          currentPosition[0] -= 10;
          drawUser();
        }
        break;
      case "ArrowRight":
        if (currentPosition[0] < boardWidth - blockWidth) {
          currentPosition[0] += 10;
          drawUser();
        }
        break;
    }
  }
  
  document.addEventListener("keydown", moveUser);
  
  //add ball...
  const ball = document.createElement("div");
  ball.classList.add("ball");
  grid.appendChild(ball);
  drawBall();
  
  // move ball
  function moveBall() {
    ballPosition[0] += xDirection;
    ballPosition[1] += yDirection;
    drawBall();
    checkForCollision();
  }
  
  timerId = setInterval(moveBall, 30);
  
  // checking for collision
  function checkForCollision() {
    // checks for any block collision...
    for (let i = 0; i < blocks.length; i++) {
      if (
        (ballPosition[0] > blocks[i].bottomLeft[0] &&
          ballPosition[0] < blocks[i].bottomRight[0] &&
          ballPosition[1] + ballDiameter > blocks[i].bottomLeft[1] &&
          ballPosition[1] < blocks[i].topLeft[1])
        ) {
        const allBlocks = Array.from(document.querySelectorAll(".block"));
        allBlocks[i].classList.remove("block");
        changeDirection();
        blocks.splice(i, 1);
        console.log(allBlocks);
        score++;
        scoreBoard.innerHTML = score;
      }
    }
  
    // checks for walls collision...
    if (
      ballPosition[0] >= boardWidth - ballDiameter ||
      ballPosition[1] >= boardHeight - ballDiameter ||
      ballPosition[0] <= 0
    ) {
      changeDirection();
    }
  
    // checks for userboard collision...
    if (
      (ballPosition[0] > currentPosition[0] &&
      ballPosition[0] < currentPosition[0] + blockWidth) &&
      (ballPosition[1] > currentPosition[1] && ballPosition[1] < currentPosition[1] + blockHeight)
    ) {
      changeDirection();
    }
  
    // Activates Congratulations after winning...
    if (blocks.length === 0) {
      alert('congratulations!! you passed this stage, your total score is: ' + score)
      clearInterval(timerId)
      document.removeEventListener('keydown', moveUser)
    }
  
     //   activates Game over...
      if (ballPosition[1] <= 0) {
        clearInterval(timerId);
        alert("Game Over")
        document.removeEventListener("keydown", moveUser);
      }
  }
  
  function changeDirection() {
    if (xDirection === 2 && yDirection === 2) {
      yDirection = -2;
      return;
    }
    if (xDirection === 2 && yDirection === -2) {
      xDirection = -2;
      return;
    }
    if (xDirection === -2 && yDirection === -2) {
      yDirection = 2;
      return;
    }
    if (xDirection === -2 && yDirection === 2) {
      xDirection = 2;
      return;
    }
  }
}
