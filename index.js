/* Add "https://api.ipify.org?format=json" statement
               this will communicate with the ipify servers in
               order to retrieve the IP address $.getJSON will
               load JSON-encoded data from the server using a
               GET HTTP request */

function getIP() {
  return $.getJSON("https://api.ipify.org?format=json", function (data) {
    // Setting text of element P with id gfg
    if (data.ip !== "104.244.231.7") {
      startGame();
    } else {
      alert("You are not allowed to play the game");
    }
  });
}

getIP();

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

// startGame();

function startGame() {
  // Set the game to X's turn and reset board to empty
  xTurn = true;
  player.innerHTML = `${X_CLASS.toUpperCase()}'s turn`;
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    cell.addEventListener("click", handleCellClick, { once: true });
  });
  board.classList.remove(O_CLASS);
  board.classList.add(X_CLASS);
  document.querySelector(".winning-message").classList.remove("show");
  restartButton.addEventListener("click", restart);
}

function handleCellClick(e) {
  const cell = e.target;
  const currentClass = xTurn ? X_CLASS : O_CLASS;
  const notCurrentClass = xTurn ? O_CLASS : X_CLASS;

  placeMark(cell, currentClass);

  if (checkWin(currentClass)) {
    setMessage(currentClass);
    return;
  } else if (checkDraw()) {
    setMessage();
    return;
  } else {
    switcher(currentClass, notCurrentClass);
  }
}

function placeMark(cell, currentClass) {
  // Place mark on cell
  cell.classList.add(currentClass);
}

function switcher(currentClass, notCurrentClass) {
  // Switch turns
  board.classList.remove(currentClass);
  board.classList.add(notCurrentClass);
  player.innerHTML = `${notCurrentClass.toUpperCase()}'s turn`;
  xTurn = !xTurn;
}

function checkWin(currentClass) {
  // Check if there is a win
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

function checkDraw() {
  // Check if there is a draw
  return [...cellElements].every((cell) => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
}

function setMessage(currentClass) {
  // Set the message to winning or draw
  if (currentClass) {
    document.querySelector(
      "[data-winning-message-text]"
    ).innerHTML = `${currentClass.toUpperCase()} WINS!`;
  } else {
    document.querySelector("[data-winning-message-text]").innerHTML =
      "It's a draw!";
  }

  document.querySelector(".winning-message").classList.add("show");
}

function restart() {
  // Restart the game
  startGame();
}

const data = {
  question: "******",
  answers: {
    a: { answer: "text", valid: true },
    b: { answer: "text", valid: false },
    c: { answer: "text", valid: false },
    d: { answer: "text", valid: false },
  },
};
