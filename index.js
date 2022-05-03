const cellElements = document.querySelectorAll("[data-cell]");
const restartButton = document.getElementById("restart-button");
const X_CLASS = "x";
const O_CLASS = "o";
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const board = document.querySelector(".board");
const player = document.querySelector(".player");
let xTurn;

startGame();

xTurn = true;
function startGame() {
  cellElements.forEach((cell) => {
    cell.addEventListener("click", handleCellClick, { once: true });
  });
  restartButton.addEventListener("click", restart);
}

function handleCellClick(e) {
  const cell = e.target;
  const currentClass = xTurn ? X_CLASS : O_CLASS;
  const notCurrentClass = xTurn ? O_CLASS : X_CLASS;

  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    document.querySelector(
      "[data-winning-message-text]"
    ).innerHTML = `${currentClass.toUpperCase()} WINS!`;
    document.querySelector(".winning-message").classList.add("show");
  } else {
    switcher(currentClass, notCurrentClass);
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function switcher(currentClass, notCurrentClass) {
  board.classList.remove(currentClass);
  board.classList.add(notCurrentClass);
  player.innerHTML = `${notCurrentClass.toUpperCase()}'s turn`;
  xTurn = !xTurn;
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

function restart() {
  location.reload();
}
