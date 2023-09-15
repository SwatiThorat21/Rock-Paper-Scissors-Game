let actionBtns = document.querySelectorAll(".action");
let winBoard = document.getElementById("winBoard");
let lostBoard = document.getElementById("lostBoard");
let tieupBoard = document.getElementById("tieupBoard");
let gameBoard = document.getElementById("gameBoard");
let replayBtn = document.querySelectorAll(".replayBtn");

let gameData = JSON.parse(localStorage.getItem("gameData")) || {
  pcScore: 0,
  userScore: 0,
  pcPicked: undefined,
  userPicked: undefined,
};

function computerPicked() {
  let pcOptions = ["rock", "paper", "scissor"];
  let pcChoiseNumber = Math.floor(Math.random() * 3);
  return pcOptions[pcChoiseNumber];
}

actionBtns.forEach((btn) => {
  btn.addEventListener("click", playGame);
});

replayBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    gameBoard.style.display = "grid";
    tieupBoard.style.display = "none";
    winBoard.style.display = "none";
    lostBoard.style.display = "none";
  });
});

function playGame(e) {
  let userChoice = e.target.id;
  console.log(userChoice);
  let pcChoise = computerPicked();
  gameData.userPicked = userChoice;
  gameData.pcPicked = pcChoise;

  const result = {
    win: "You win",
    lost: "You lost",
    tieup: "Tie up",
  };

  let res;
  if (userChoice === pcChoise) {
    res = result.tieup;
    tieupBoard.style.display = "flex";
    gameBoard.style.display = "none";
  } else if (
    (userChoice === "rock" && pcChoise === "scissor") ||
    (userChoice === "paper" && pcChoise === "rock") ||
    (userChoice === "scissor" && pcChoise === "paper")
  ) {
    res = result.win;
    gameData.userScore++;
    winBoard.style.display = "flex";
    gameBoard.style.display = "none";
  } else {
    res = result.lost;
    gameData.pcScore++;
    lostBoard.style.display = "flex";
    gameBoard.style.display = "none";
  }

  localStorage.setItem("gameData", JSON.stringify(gameData));
}
