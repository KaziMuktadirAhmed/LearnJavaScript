import * as model from './model';
import recipeView from './views/recipe.view';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    // Loading recipe
    if (!id) return;
    recipeView.renderSpninner();

    await model.loadRecipe(id);

    // Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    alert(error);
  }
};
showRecipe();

['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, showRecipe)
);
