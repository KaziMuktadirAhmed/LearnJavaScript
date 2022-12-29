'use strict';

const player_0_score_node = document.getElementById('score--0');
const player_1_score_node = document.getElementById('score--1');
const dice_node = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

player_0_score_node.textContent = 0;
player_1_score_node.textContent = 0;
dice_node.classList.add('hidden');

btnRoll.addEventListener('click', event => {
  const randomRoll = Math.trunc(Math.random() * 6) + 1;
  dice_node.classList.remove('hidden');
  dice_node.src = `dice-${randomRoll}.png`;
});
