"use strict";

let secrate = Math.trunc(Math.random() * 20) + 1;
let score = 10,
  highscore = 0;

document.querySelector(".guess").value = 0;
document.querySelector(".score").textContent = score;
document.querySelector(".highscore").textContent = highscore;

document.querySelector(".check").addEventListener("click", () => {
  const value = Number(document.querySelector(".guess").value);

  if (!value) {
    showMessage("⛔ Invalid number");
  } else if (value === secrate) {
    showMessage("🎉 Correct Guess !!");
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").textContent = secrate;
    document.querySelector(".number").style.width = "30rem";

    if (score > highscore) {
      highscore = score;
      document.querySelector(".highscore").textContent = highscore;
    }
  } else if (value !== secrate) {
    if (score > 0) {
      showMessage(value > secrate ? "📈 Too high" : "📉 Too low");
      score--;
    } else {
      showMessage("💥 You lost the game");
    }
  } else {
    showMessage("Start guessing ...");
  }
  document.querySelector(".score").textContent = score;
});

document.querySelector(".again").addEventListener("click", () => {
  score = 10;
  secrate = Math.trunc(Math.random() * 20) + 1;
  showMessage("Start guessing ...");
  document.querySelector(".guess").value = 0;
  document.querySelector(".score").textContent = score;
  document.querySelector(".number").textContent = "?";

  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";
});

function showMessage(message) {
  document.querySelector(".message").textContent = message;
}
