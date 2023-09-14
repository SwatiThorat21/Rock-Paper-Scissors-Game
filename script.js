let rockAction_btn = document.getElementById("rockAction_btn");
let paperAction_btn = document.getElementById("paperAction_btn");
let scissorAction_btn = document.getElementById("scissorAction_btn");

let gameData = {
  pcScore: 0,
  userScore: 0,
  pcPicked: undefined,
  userPicked: undefined,
};

localStorage.setItem("gameData", JSON.stringify(gameData));

rockAction_btn.addEventListener("click", () => {
  let pcOptions = ["rock", "paper", "scissor"];
  let pcChoiseNumber = Math.floor(Math.random() * 3);
  let pcChoise = pcOptions[pcChoiseNumber];
  console.log(pcChoise);
  const updatedGameData = JSON.parse(localStorage.getItem("gameData"));
  updatedGameData.userPicked = "rock";
  updatedGameData.pcPicked = pcChoise;
  if (
    updatedGameData.userPicked == "rock" &&
    updatedGameData.pcPicked == "scissor"
  ) {
    updatedGameData.userScore++;
  } else if (
    updatedGameData.userPicked == "scissor" &&
    updatedGameData.pcPicked == "rock"
  ) {
    updatedGameData.pcScore++;
  }
  localStorage.setItem("gameData", JSON.stringify(updatedGameData));
});

paperAction_btn.addEventListener("click", () => {
  let pcOptions = ["rock", "paper", "scissor"];
  let pcChoiseNumber = Math.floor(Math.random() * 3);
  let pcChoise = pcOptions[pcChoiseNumber];
  console.log(pcChoise);
  const updatedGameData = JSON.parse(localStorage.getItem("gameData"));
  updatedGameData.userPicked = "paper";
  updatedGameData.pcPicked = pcChoise;
  if (
    updatedGameData.userPicked == "paper" &&
    updatedGameData.pcPicked == "rock"
  ) {
    updatedGameData.userScore++;
  } else if (
    updatedGameData.userPicked == "rock" &&
    updatedGameData.pcPicked == "paper"
  ) {
    updatedGameData.pcScore++;
  }
  localStorage.setItem("gameData", JSON.stringify(updatedGameData));
});

scissorAction_btn.addEventListener("click", () => {
  let pcOptions = ["rock", "paper", "scissor"];
  let pcChoiseNumber = Math.floor(Math.random() * 3);
  let pcChoise = pcOptions[pcChoiseNumber];
  let updatedGameData = JSON.parse(localStorage.getItem("gameData"));
  updatedGameData.userPicked = "scissor";
  updatedGameData.pcPicked = pcChoise;
  if (
    updatedGameData.userPicked == "scissor" &&
    updatedGameData.pcPicked == "paper"
  ) {
    updatedGameData.userScore++;
  } else if (
    updatedGameData.userPicked == "paper" &&
    updatedGameData.pcPicked == "scissor"
  ) {
    updatedGameData.pcScore++;
  }
  localStorage.setItem("gameData", JSON.stringify(updatedGameData));
});
