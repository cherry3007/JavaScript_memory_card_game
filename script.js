const board = document.getElementById("game-board");
const movesText = document.getElementById("moves");
const timerText = document.getElementById("timer");
const stopBtn = document.getElementById("stopBtn");
const restartBtn = document.getElementById("restartBtn");

const icons = ["🍎", "🍌", "🍇", "🍓", "🍊", "🍉", "🍍", "🥝"];
let cards = [...icons, ...icons];
let flippedCards = [];
let matched = 0;
let moves = 0;
let time = 0;
let timerStarted = false;
let timer;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function startTimer() {
  timer = setInterval(() => {
    time++;
    timerText.textContent = `Time: ${time}s`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

function createBoard() {
  shuffle(cards);
  board.innerHTML = "";
  cards.forEach((icon, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.icon = icon;

    const cardInner = document.createElement("div");
    cardInner.classList.add("card-inner");

    const front = document.createElement("div");
    front.classList.add("front");
    front.textContent = icon;

    const back = document.createElement("div");
    back.classList.add("back");
    back.textContent = "❓";

    cardInner.appendChild(front);
    cardInner.appendChild(back);
    card.appendChild(cardInner);

    card.addEventListener("click", flipCard);
    board.appendChild(card);
  });
}

function flipCard() {
  if (!timerStarted) {
    startTimer();
    timerStarted = true;
  }

  if (
    flippedCards.length === 2 ||
    this.classList.contains("flipped") ||
    this.classList.contains("matched")
  )
    return;

  this.classList.add("flipped");
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    moves++;
    movesText.textContent = "Moves: " + moves;

    const [card1, card2] = flippedCards;
    if (card1.dataset.icon === card2.dataset.icon) {
      card1.classList.add("matched");
      card2.classList.add("matched");
      flippedCards = [];
      matched += 1;
      if (matched === icons.length) {
        stopTimer();
        setTimeout(() => {
          alert(`🎉 You won! 🎉\nTime: ${time}s\nMoves: ${moves}`);
        }, 500);
      }
    } else {
      setTimeout(() => {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        flippedCards = [];
      }, 1000);
    }
  }
}

stopBtn.addEventListener("click", () => {
  stopTimer();
  alert("Game stopped!");
});

restartBtn.addEventListener("click", () => {
  location.reload();
});

createBoard();