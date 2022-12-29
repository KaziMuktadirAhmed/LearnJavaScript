'use strict';

const scores = [0, 0];
let current_player = 0;
let current_score = 0;

const player_0_score_node = document.getElementById('score--0');
const player_1_score_node = document.getElementById('score--1');
const dice_node = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

player_0_score_node.textContent = scores[0];
player_1_score_node.textContent = scores[1];
dice_node.classList.add('hidden');

btnRoll.addEventListener('click', event => {
  const randomRoll = Math.trunc(Math.random() * 6) + 1;
  dice_node.classList.remove('hidden');
  dice_node.src = `dice-${randomRoll}.png`;
  evaluateDiceRoll(randomRoll);
});

function evaluateDiceRoll(roll) {
  if (roll !== 1) {
    current_score += roll;
    document.getElementById(`current--${current_player}`).textContent =
      current_score;
  } else {
    current_score = 0;
    document.getElementById(`current--${current_player}`).textContent =
      current_score;
    switchPlayer();
  }
}

function switchPlayer() {
  current_player = (current_player + 1) % 2;
}
