"use strict";

let secrate = Math.trunc(Math.random() * 20) + 1;
let score = 10,
  highscore = 0;

document.querySelector(".guess").value = 0;
document.querySelector(".score").textContent = score;
document.querySelector(".highscore").textContent = highscore;

document.querySelector(".check").addEventListener("click", () => {
  const value = Number(document.querySelector(".guess").value);

  // invalid input
  if (!value) {
    document.querySelector(".message").textContent = "⛔ Not a number";
  }
  // correct guess
  else if (value == secrate) {
    document.querySelector(".message").textContent = "🎉 Correct Guess !!";
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").textContent = secrate;
    document.querySelector(".number").style.width = "30rem";

    if (score > highscore) {
      highscore = score;
      document.querySelector(".highscore").textContent = highscore;
    }
  }
  // when guess is too high
  else if (value > secrate) {
    if (score > 0) {
      document.querySelector(".message").textContent = "📈 Too high";
      score--;
    } else {
      document.querySelector(".message").textContent = "💥 You lost the game";
    }
  }
  // when guess is too low
  else if (value < secrate) {
    if (score > 0) {
      document.querySelector(".message").textContent = "📉 Too low";
      score--;
    } else {
      document.querySelector(".message").textContent = "💥 You lost the game";
    }
  } else {
    document.querySelector(".message").textContent = "Start guessing ...";
  }
  document.querySelector(".score").textContent = score;
  console.log(`current value ${value}`);
});

document.querySelector(".again").addEventListener("click", () => {
  score = 10;
  secrate = Math.trunc(Math.random() * 20) + 1;
  document.querySelector(".message").textContent = "Start guessing ...";
  document.querySelector(".guess").value = 0;
  document.querySelector(".score").textContent = score;
  document.querySelector(".number").textContent = "?";

  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";
});
