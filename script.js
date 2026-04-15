const game = document.getElementById("game");
const movesDisplay = document.getElementById("moves");

let cardsArray = ["🍎","🍌","🍇","🍓","🍎","🍌","🍇","🍓"];
let flippedCards = [];
let moves = 0;

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

function createBoard() {
  game.innerHTML = "";
  shuffle(cardsArray).forEach(symbol => {
    let card = document.createElement("div");
    card.classList.add("card");
    card.dataset.symbol = symbol;
    card.innerText = "";
    
    card.addEventListener("click", flipCard);
    game.appendChild(card);
  });
}

function flipCard() {
  if (flippedCards.length < 2 && !this.classList.contains("flipped")) {
    this.innerText = this.dataset.symbol;
    this.classList.add("flipped");
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      moves++;
      movesDisplay.innerText = moves;

      if (flippedCards[0].dataset.symbol === flippedCards[1].dataset.symbol) {
        flippedCards = [];
      } else {
        setTimeout(() => {
          flippedCards.forEach(card => {
            card.innerText = "";
            card.classList.remove("flipped");
          });
          flippedCards = [];
        }, 800);
      }
    }
  }
}

function restartGame() {
  moves = 0;
  movesDisplay.innerText = moves;
  flippedCards = [];
  createBoard();
}

createBoard();