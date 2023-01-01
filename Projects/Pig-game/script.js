'use strict';

const scores = [0, 0];
let current_player = 0;
let current_score = 0;
let game = true;

const player_0_node = document.querySelector('.player--0');
const player_1_node = document.querySelector('.player--1');
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
  if (game) {
    const randomRoll = Math.trunc(Math.random() * 6) + 1;
    dice_node.classList.remove('hidden');
    dice_node.src = `dice-${randomRoll}.png`;
    evaluateDiceRoll(randomRoll);
  }
});

btnHold.addEventListener('click', event => {
  if (game) {
    scores[current_player] += current_score;
    document.querySelector(`#score--${current_player}`).textContent =
      scores[current_player];

    if (scores[current_player] >= 100) {
      document
        .querySelector(`.player--${current_player}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${current_player}`)
        .classList.remove(`player--active`);
      game = false;
    } else {
      switchPlayer();
    }
  }
});

function evaluateDiceRoll(roll) {
  if (roll !== 1) {
    current_score += roll;
    document.getElementById(`current--${current_player}`).textContent =
      current_score;
  } else {
    current_score = 0;
    switchPlayer();
  }
}

function switchPlayer() {
  document.getElementById(`current--${current_player}`).textContent =
    current_score;
  current_player = (current_player + 1) % 2;
  player_0_node.classList.toggle('player--active');
  player_1_node.classList.toggle('player--active');
}
