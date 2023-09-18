let actionBtns = document.querySelectorAll(".action");
let gameBoard = document.getElementById("gameBoard");
let replayBtn = document.querySelectorAll(".replayBtn");
let scoreContainer = document.getElementById("scoreContainer");
let rulesBtn = document.getElementById("rulesBtn");
let nextBtn = document.getElementById("nextBtn");
let closeBtn = document.getElementById("closeBtn");
let rules_box = document.getElementById("rules_box");
let userPickedAction = document.getElementById("userPickedAction");
let pcPickedAction = document.getElementById("pcPickedAction");
let resultBoard = document.getElementById("resultBoard");
let userPickedImg = document.getElementById("userPickedImg");
let pcPickedImg = document.getElementById("pcPickedImg");
let resultText = document.getElementById("resultText");
let resultTextPara = document.getElementById('resultTextPara')
let firstUserOuterDiv = document.getElementById('firstUserOuterDiv');
let secondUserOuterDiv = document.getElementById('secondUserOuterDiv');
let thirdUserOuterDiv = document.getElementById('thirdUserOuterDiv');
let firstPcOuterDiv = document.getElementById('firstPcOuterDiv');
let secondPcOuterDiv = document.getElementById('secondPcOuterDiv');
let thirdPcOuterDiv = document.getElementById('thirdPcOuterDiv');

let gameData = JSON.parse(localStorage.getItem("gameData")) || {
  pcScore: 0,
  userScore: 0,
  pcPicked: undefined,
  userPicked: undefined,
};

scoreContainer.innerHTML = getHTMLforScoreBoard();
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
    resultBoard.style.display = "none";
  });
});

function getHTMLforScoreBoard() {
  let scoreBoardHTML = `
               <div class="computerScore score">
                    <P>COMPUTER</P>
                    <p>SCORE</P>
                    <P class="scoreNum">${gameData.pcScore}</P>
                </div>
                <div class="userScore score">
                    <P>YOUR</P>
                    <p>SCORE</P>
                    <P class="scoreNum">${gameData.userScore}</P>
                </div>
`;
  return scoreBoardHTML;
}

function playGame(e) {
  let userChoice = e.target.id;
  let pcChoise = computerPicked();
  gameData.userPicked = userChoice;
  gameData.pcPicked = pcChoise;

  userPickedImg.setAttribute("src", `Images/${gameData.userPicked}.png`);
  pcPickedImg.setAttribute("src", `Images/${gameData.pcPicked}.png`);
  userPickedAction.classList.add(`${gameData.userPicked}`);
  pcPickedAction.classList.add(`${gameData.pcPicked}`);
 
  const result = {
    win: "You win",
    lost: "You lost",
    tieup: "Tie up",
  };
  let res;
  if (userChoice === pcChoise) {
    res = result.tieup;
    gameBoard.style.display = "none";
    resultBoard.style.display = "flex";
    resultText.innerText = "TIE UP";
    resultTextPara.style.display = "none";
    firstUserOuterDiv.classList.remove('firstOuterDiv');
    secondUserOuterDiv.classList.remove('secondOuterDiv');
    thirdUserOuterDiv.classList.remove('thirdOuterDiv');
    firstPcOuterDiv.classList.remove('firstOuterDiv');
    secondPcOuterDiv.classList.remove('secondOuterDiv');
    thirdPcOuterDiv.classList.remove('thirdOuterDiv');
  } else if (
    (userChoice === "rock" && pcChoise === "scissor") ||
    (userChoice === "paper" && pcChoise === "rock") ||
    (userChoice === "scissor" && pcChoise === "paper")
  ) {
    res = result.win;
    gameData.userScore++;
    gameBoard.style.display = "none";
    nextBtn.style.display = "block";
    scoreContainer.innerHTML = getHTMLforScoreBoard();
    resultBoard.style.display = "flex";
    firstUserOuterDiv.classList.add('firstOuterDiv');
    secondUserOuterDiv.classList.add('secondOuterDiv');
    thirdUserOuterDiv.classList.add('thirdOuterDiv');
    resultText.innerText = "YOU WIN"
  } else {
    res = result.lost;
    gameData.pcScore++;
    gameBoard.style.display = "none";
    scoreContainer.innerHTML = getHTMLforScoreBoard();
    resultBoard.style.display = "flex";
    firstPcOuterDiv.classList.add('firstOuterDiv');
    secondPcOuterDiv.classList.add('secondOuterDiv');
    thirdPcOuterDiv.classList.add('thirdOuterDiv');
    resultText.innerText = "YOU LOST"
  }

  localStorage.setItem("gameData", JSON.stringify(gameData));
}

rulesBtn.addEventListener("click", () => {
  rules_box.style.display = "block";
});

closeBtn
  .addEventListener("click", () => {
    rules_box.style.display = "none";
  })
  .nextBtn.addEventListener("click", () => {});
