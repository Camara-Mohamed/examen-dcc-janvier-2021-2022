// Nom    : Camara
// Prénom : Mohamed
// Groupe : 2285

import {fonts} from "./fonts";
import {settings as s} from "./settings";

const ulCardElement = document.querySelector(s.ulCardSelector);
const dataListFontElement = document.getElementById(s.datalistId);
const scoreElement = document.querySelector(s.scoreSelector);
const timeElement = document.querySelector(s.timeSelector);
const maxTime = parseInt(timeElement.dataset.maxTime);

let guessedCard = 0;
let remainingTime = maxTime;
let timerId = null;

function generateCardElement(font) {
    ulCardElement.insertAdjacentHTML("beforeend", `<li data-font-name="${font.name}" data-family="${font.family}" class='app__item'>
  <div class="app__item__info"><span class="app__item__info__name">${font.name}</span>
    <span class="app__item__info__info">${font.family} - ${font.author}</span>
  </div>
  <img class='app__item__font' src='./assets/fonts/${font.file}.svg' alt='Aa, abcdefghijklmnopqrstuvwxyz, ABCDEFGHIJKLMNOPQRSTUVWXYZ'>
</li>`)
}

function generateDataOption(font) {
    dataListFontElement.insertAdjacentHTML("beforeend", `<option value=${font.name}></option>`)
}

function displayScore() {
    scoreElement.textContent = scoreElement.dataset.text + guessedCard + "/" + fonts.length
}

function formatTime(remainingTime) {
    const min = Math.trunc(remainingTime / 60);
    const sec = remainingTime % 60;
    return `${min > 10 ? "0" : ""}${min}'${sec < 10 ? "0" : ""}${sec}"`;
}

function displayNextCard() {

}

function updateTime() {
    remainingTime--;
    displayRemainingTime();
    if (remainingTime === 0) {
        displayNextCard();
        clearInterval(timerId);
    }
}

function displayRemainingTime() {
    timeElement.textContent = timeElement.dataset.text + formatTime(remainingTime);
}

for (const font of fonts) {
    generateCardElement(font);
    generateDataOption(font);
}

displayScore();
displayRemainingTime();

timerId = setInterval(() => {
    updateTime();
}, 1000);
