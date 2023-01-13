"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

const request = new XMLHttpRequest();
const name = "Bangladesh";
request.open("GET", `https://restcountries.com/v3.1/name/bangladesh`);
request.send();

request.addEventListener("load", function () {
  //   console.log(this.responseText);
  const [data] = JSON.parse(this.responseText);
  console.dir(data);

  const html = `<article class="country">
  <img class="country__img" src="${data.flags.png}" />
  <div class="country__data">
    <h3 class="country__name">${data.name.official}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 100000
    ).toFixed(1)}</p>
    <p class="country__row"><span>🗣️</span>${data.languages.ben}</p>
    <p class="country__row"><span>💰</span>${data.currencies.BDT.name}</p>
  </div>
</article>`;

  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
});
