'use strict';

const player_0_score_node = document.getElementById('score--0');
const player_1_score_node = document.getElementById('score--1');
const dice_node = document.querySelector('.dice');

player_0_score_node.textContent = 0;
player_1_score_node.textContent = 0;
dice_node.classList.add('hidden');
