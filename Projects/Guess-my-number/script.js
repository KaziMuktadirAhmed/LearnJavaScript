"use strict";

const secrate = Math.trunc(Math.random() * 20) + 1;
let score = 10;
document.querySelector(".guess").value = 0;
document.querySelector(".score").textContent = score;

document.querySelector(".check").addEventListener("click", () => {
  const value = Number(document.querySelector(".guess").value);
  if (!value) {
    document.querySelector(".message").textContent = "⛔ Not a number";
  } else if (value == secrate) {
    document.querySelector(".message").textContent = "🎉 Correct";
  } else if (value > secrate) {
    if (score > 0) {
      document.querySelector(".message").textContent = "📈 Too high";
      score--;
    } else {
      document.querySelector(".message").textContent = "💥 You lost the game";
    }
  } else if (value < secrate) {
    if (score > 0) {
      document.querySelector(".message").textContent = "📉 Too low";
      score--;
    } else {
      document.querySelector(".message").textContent = "💥 You lost the game";
    }
  } else {
    document.querySelector(".message").textContent = "Start guessing ......";
  }
  document.querySelector(".score").textContent = score;
  console.log(`current value ${value}`);
});
