const cardArray = [
  {
    name: "fries",
    img: "../images/fries.png",
  },
  {
    name: "cheeseburger",
    img: "../images/cheeseburger.png",
  },
  {
    name: "ice-cream",
    img: "../images/ice-cream.png",
  },
  {
    name: "pizza",
    img: "../images/pizza.png",
  },
  {
    name: "milkshake",
    img: "../images/milkshake.png",
  },
  {
    name: "hotdog",
    img: "../images/hotdog.png",
  },
  {
    name: "fries",
    img: "../images/fries.png",
  },
  {
    name: "cheeseburger",
    img: "../images/cheeseburger.png",
  },
  {
    name: "ice-cream",
    img: "../images/ice-cream.png",
  },
  {
    name: "pizza",
    img: "../images/pizza.png",
  },
  {
    name: "milkshake",
    img: "../images/milkshake.png",
  },
  {
    name: "hotdog",
    img: "../images/hotdog.png",
  },
];

cardArray.sort(() => 0.5 - Math.random());

const grid = document.querySelector("#grid");
const score = document.querySelector("#score");
let cardsChosen = [];
let cardsChosenIds = [];
const cardsWon = [];

function createBoard() {
  for (let i = 0; i < cardArray.length; i++) {
    const card = document.createElement("img");
    card.setAttribute("src", "../images/blank.png");
    card.setAttribute("data-id", i);
    card.addEventListener("click", flipCard);
    grid.appendChild(card);
  }
}
createBoard();

function checkMatch() {
  const cards = document.querySelectorAll("#grid img");
  const result = document.querySelector("#score");
  const optionOneId = cardsChosenIds[0];
  const optionTwoId = cardsChosenIds[1];

  if (optionOneId === optionTwoId) {
    alert("you have clicked the same image");
	cards[optionOneId].setAttribute("src", "../images/blank.png");
    cards[optionTwoId].setAttribute("src", "../images/blank.png");
  }

  if (cardsChosen[0] === cardsChosen[1]) {
    alert("found");
    cards[optionOneId].setAttribute("src", "../images/white.png");
    cards[optionTwoId].setAttribute("src", "../images/white.png");
    cards[optionOneId].removeEventListener("click", flipCard);
    cards[optionTwoId].removeEventListener("click", flipCard);
    cardsWon.push(cardsChosen);
  } else {
    alert("Not a match ");
    cards[optionOneId].setAttribute("src", "../images/blank.png");
    cards[optionTwoId].setAttribute("src", "../images/blank.png");
  }

  result.textContent = cardsWon.length;
  cardsChosen = [];
  cardsChosenIds = [];

  if (cardsWon.length === cardArray.length / 2) {
    result.innerHTML = "Congratulations, you completed the game";
  }
}

function flipCard() {
  const cardId = this.getAttribute("data-id");
  cardsChosen.push(cardArray[cardId].name);
  cardsChosenIds.push(cardId);
  console.log(cardsChosenIds, cardsChosen);
  this.setAttribute("src", cardArray[cardId].img);

  if (cardsChosen.length == 2) {
    setTimeout(checkMatch, 200);
  }
}
