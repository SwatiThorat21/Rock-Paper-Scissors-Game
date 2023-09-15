let actionBtns = document.querySelectorAll(".action");
let winBoard = document.getElementById("winBoard");
let lostBoard = document.getElementById("lostBoard");
let tieupBoard = document.getElementById("tieupBoard");
let gameBoard = document.getElementById("gameBoard");
let replayBtn = document.querySelectorAll('.replayBtn');

let gameData = {
  pcScore: 0,
  userScore: 0,
  pcPicked: undefined,
  userPicked: undefined,
};

localStorage.setItem("gameData", JSON.stringify(gameData));

function computerPicked() {
  let pcOptions = ["rock", "paper", "scissor"];
  let pcChoiseNumber = Math.floor(Math.random() * 3);
  return pcOptions[pcChoiseNumber];
}

actionBtns.forEach((btn) => {
  btn.addEventListener("click", playGame);
});

function playGame(e) {
  let userChoice = e.target.id;
  console.log(userChoice);
  let pcChoise = computerPicked();
  let updatedGameData = JSON.parse(localStorage.getItem("gameData"));
  updatedGameData.userPicked = userChoice;
  updatedGameData.pcPicked = pcChoise;

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
    (userChoice === "rock" && pcChoise === "scissors") ||
    (userChoice === "paper" && pcChoise === "rock") ||
    (userChoice === "scissors" && pcChoise === "paper")
  ) {
    res = result.win;
    updatedGameData.userScore++;
    winBoard.style.display = "flex";
    gameBoard.style.display = "none";
  } else {
    res = result.lost;
    updatedGameData.pcScore++;
    lostBoard.style.display = "flex";
    gameBoard.style.display = "none";
  }

  localStorage.setItem("gameData", JSON.stringify(updatedGameData));
}
