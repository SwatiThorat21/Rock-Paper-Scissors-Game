
let actionBtns = document.querySelectorAll(".action");
let gameBoard = document.getElementById("gameBoard");
let scoreContainer = document.getElementById("scoreContainer");
let playAgainBtn = document.getElementById("playAgainBtn");
//.........Get buttons............. //  
let replayBtn = document.querySelectorAll(".replayBtn");
let rulesBtn = document.getElementById("rulesBtn");
let nextBtn = document.getElementById("nextBtn");
let closeBtn = document.getElementById("closeBtn");
//.........Get rule box............. // 
let rules_box = document.getElementById("rules_box");
//.........Get container............. // 
let container = document.getElementById("container");
//.........Result board elements............. // 
let userPickedAction = document.getElementById("userPickedAction");
let pcPickedAction = document.getElementById("pcPickedAction");
let resultBoard = document.getElementById("resultBoard");
let userPickedImg = document.getElementById("userPickedImg");
let pcPickedImg = document.getElementById("pcPickedImg");
let resultText = document.getElementById("resultText");
let resultTextPara = document.getElementById("resultTextPara");
let firstUserOuterDiv = document.getElementById("firstUserOuterDiv");
let secondUserOuterDiv = document.getElementById("secondUserOuterDiv");
let thirdUserOuterDiv = document.getElementById("thirdUserOuterDiv");
let firstPcOuterDiv = document.getElementById("firstPcOuterDiv");
let secondPcOuterDiv = document.getElementById("secondPcOuterDiv");
let thirdPcOuterDiv = document.getElementById("thirdPcOuterDiv");

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
    nextBtn.style.display = "none";
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
  userPickedAction.classList.remove("rock");
  userPickedAction.classList.remove("paper");
  userPickedAction.classList.remove("scissor");
  pcPickedAction.classList.remove("rock");
  pcPickedAction.classList.remove("paper");
  pcPickedAction.classList.remove("scissor");

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
    resultText.innerText = "TIE UP";
    resultBoard.style.display = "flex";
    resultBoard.classList.add("tieupResultBoard");
    resultTextPara.style.display = "none";
    firstUserOuterDiv.classList.remove("firstOuterDiv");
    secondUserOuterDiv.classList.remove("secondOuterDiv");
    thirdUserOuterDiv.classList.remove("thirdOuterDiv");
    firstPcOuterDiv.classList.remove("firstOuterDiv");
    secondPcOuterDiv.classList.remove("secondOuterDiv");
    thirdPcOuterDiv.classList.remove("thirdOuterDiv");
  } else if (
    (userChoice === "rock" && pcChoise === "scissor") ||
    (userChoice === "paper" && pcChoise === "rock") ||
    (userChoice === "scissor" && pcChoise === "paper")
  ) {
    res = result.win;
    gameData.userScore++;
    resultText.innerText = "YOU WIN";
    resultBoard.style.display = "flex";
    gameBoard.style.display = "none";
    nextBtn.style.display = "block";
    resultTextPara.style.display = "block";
    scoreContainer.innerHTML = getHTMLforScoreBoard();
    firstUserOuterDiv.classList.add("firstOuterDiv");
    secondUserOuterDiv.classList.add("secondOuterDiv");
    thirdUserOuterDiv.classList.add("thirdOuterDiv");
    firstPcOuterDiv.classList.remove("firstOuterDiv");
    secondPcOuterDiv.classList.remove("secondOuterDiv");
    thirdPcOuterDiv.classList.remove("thirdOuterDiv");
    resultBoard.classList.remove("tieupResultBoard");
  } else {
    res = result.lost;
    gameData.pcScore++;
    gameBoard.style.display = "none";
    scoreContainer.innerHTML = getHTMLforScoreBoard();
    resultBoard.style.display = "flex";
    resultTextPara.style.display = "block";
    firstPcOuterDiv.classList.add("firstOuterDiv");
    secondPcOuterDiv.classList.add("secondOuterDiv");
    thirdPcOuterDiv.classList.add("thirdOuterDiv");
    firstUserOuterDiv.classList.remove("firstOuterDiv");
    secondUserOuterDiv.classList.remove("secondOuterDiv");
    thirdUserOuterDiv.classList.remove("thirdOuterDiv");
    resultText.innerText = "YOU LOST";
    resultBoard.classList.remove("tieupResultBoard");
  }

  localStorage.setItem("gameData", JSON.stringify(gameData));
}

rulesBtn.addEventListener("click", () => {
  rules_box.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  rules_box.style.display = "none";
});

nextBtn.addEventListener("click", () => {
  console.log("clicked");
  winner_page.style.display = "flex";
  container.style.display = "none";
});

playAgainBtn.addEventListener("click", () => {
  winner_page.style.display = "none";
  container.style.display = "flex";
});
