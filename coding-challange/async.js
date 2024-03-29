"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

const getCountryAndNeighbour = function (coutry) {};

const renderContry = function (data, className = "") {
  const html = `<article class="country ${className}">
  <img class="country__img" src="${data.flags.png}" />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 100000
    ).toFixed(1)}</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
  </div>
  </article>`;
  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  const name = "Bangladesh";
  request.open("GET", `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener("load", function () {
    //   console.log(this.responseText);
    // console.log(this);
    const [data] = JSON.parse(this.responseText);

    // Render country 1
    renderContry(data);

    const neighbour = data.borders;

    if (!neighbour) return;

    const request2 = new XMLHttpRequest();
    request2.open("GET", `https://restcountries.com/v2/alpha/${neighbour[0]}`);
    request2.send();

    request2.addEventListener("load", function () {
      const data2 = JSON.parse(this.responseText);
      renderContry(data2, "neighbour");
    });
  });
};
getCountryData("Bangladesh");
// getCountryData("UAE");
getCountryData("USA");

const req = fetch("GET", `https://restcountries.com/v2/name/bangladesh`);
console.log(req);
