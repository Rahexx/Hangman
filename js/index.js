import Game from './game';
import image1 from '../images/blackboard1.png';
import image2 from '../images/blackboard2.png';
import image3 from '../images/blackboard3.png';
import image4 from '../images/blackboard4.png';
import image5 from '../images/blackboard5.png';
import image6 from '../images/blackboard6.png';
import image7 from '../images/blackboard7.png';
import image8 from '../images/blackboard8.png';

const categoriesList = document.querySelector('.popup__list');
const popUp = document.querySelector('.popup');
const resultGamePopUp = document.querySelector('.popup__result');
const categoryBtn = document.querySelector('.list-buttons__change-category');
const randomInfo = document.querySelector('.popup__random-info');
const endGamePopUp = document.querySelector('.popup__end-category');
const iconClosePopUp = document.querySelector('.popup__exit');
const iconCloseResult = document.querySelector('.popup__result .popup__exit');
const closeRandomInfo = document.querySelector(
  '.popup__random-info .popup__exit',
);
const closeEndGame = document.querySelector(
  '.popup__end-category .popup__exit',
);
const endGameTitle = document.querySelector(
  '.popup__end-category .popup__title',
);
const resultInfo = document.querySelector('.popup__result .popup__title');
const randomBtn = document.querySelector('.list-buttons__random');
const currentCategoryElem = document.querySelector('.header__category span');
const letters = document.querySelectorAll('.keyboard__letter');
const keyboard = document.querySelector('.keyboard');
const gallows = document.querySelector('.hangman__img');
const gameInfo = document.querySelector('.header__info');
const passwordElem = document.querySelector('.password');
const srcImages = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
];
const game = new Game();
let visibleLetter = 0;
let startTime = 0;
let endTime = 0;

function checkPasswords() {
  const pastPasswordsLength = game.getPastPasswords().length;
  const currentCategory = game.getCurrentCategory();
  const categories = game.categories.find(
    (password) => password.name === currentCategory,
  );
  if (categories.passwords.length === pastPasswordsLength) return true;

  return false;
}

function clearKeabord() {
  const items = document.querySelectorAll('.keyboard__letter');
  const itemsArr = [...items];

  itemsArr.map((item) => {
    if (item.classList.contains('keyboard__letter--checked')) {
      item.classList.remove('keyboard__letter--checked');
      item.style.cursor = 'pointer';
      item.addEventListener('click', checkedLetter);
    }
  });
}

function displayEndGame(text = 'Wynik') {
  endGamePopUp.style.display = 'block';
  endGameTitle.textContent = text;
}

function displayResult(text) {
  resultGamePopUp.style.display = 'block';
  resultInfo.textContent = text;
}

function countTime() {
  endTime = Date.now();
  const seconds = Math.round((endTime - startTime) / 1000);
  let minutes;
  let remainSeconds;
  if (seconds > 60) {
    minutes = Math.floor(seconds / 60);
    remainSeconds = seconds % 60;
    gameInfo.textContent = `odgadniętych: ${game.getScore()} śr.czas: ${minutes}:${
      remainSeconds < 10 ? '0' : ''
    }${remainSeconds}`;
    return [minutes, remainSeconds];
  }

  gameInfo.textContent = `odgadniętych: ${game.getScore()} śr.czas: 0:${
    seconds < 10 ? '0' : ''
  }${seconds}`;
  return [seconds];
}

function winGame() {
  game.increaseScore();
  countTime();
  displayResult('Brawo wygrałeś');
  game.pushPastPasswords(game.getCurrentPassword());
  clearKeabord();
}

function lostGame() {
  countTime();
  displayResult('Niestety tym razem Ci się nie udało');
  game.pushPastPasswords(game.getCurrentPassword());
  clearKeabord();
}

function checkResult() {
  const password = document.querySelectorAll('.password__content');
  const passwordArr = [...password];
  const passwordsLength = game.categories.find(
    (item) => item.name === game.getCurrentCategory(),
  ).passwords;
  let countVisible = 0;
  let countChildren = 0;

  passwordArr.map((item) => {
    const itemChildren = [...item.children];
    countChildren += itemChildren.length;

    itemChildren.map((child) => {
      if (child.style.visibility) {
        countVisible++;
      }
    });
  });

  // Display sum result game

  if (
    (countChildren === countVisible ||
      game.getMistake() === game.getMaxNumberMistake()) &&
    game.getPastPasswords().length + 1 === passwordsLength.length
  ) {
    if (countChildren === countVisible) game.increaseScore();
    const sumTime = countTime();
    game.pushPastPasswords(game.getCurrentPassword());
    if (sumTime.length === 1) {
      displayEndGame(
        `Koniec gry twój wynik to ${game.getScore()}/${
          game.getPastPasswords().length
        } w czasie 0:${sumTime[0] < 10 ? '0' : ''}${sumTime[0]}`,
      );
    } else {
      displayEndGame(
        `Koniec gry twój wynik to ${game.getScore()}/${
          game.getPastPasswords().length
        } w czasie ${sumTime[0]}:${sumTime[1] < 10 ? '0' : ''}${sumTime[1]}`,
      );
    }

    clearKeabord();
    return;
  }

  // You win
  if (countChildren === countVisible) winGame();

  // You lost
  if (game.getMistake() === game.getMaxNumberMistake()) lostGame();
}

function resetImage() {
  gallows.style.opacity = 0;
  const newSrc = srcImages[0].split('.')[1];
  gallows.src = `blackboard1.${newSrc}.png`;
  game.setMistake(0);
}

function changeImage(beginValue) {
  if (!(visibleLetter !== beginValue)) {
    game.increaseMistake();
    const number = game.getMistake();
    if (number === 1) {
      gallows.style.opacity = 1;
    } else if (number < game.maxNumberMistake + 1) {
      const newSrc = srcImages[number - 1].split('.')[1];
      gallows.src = `blackboard${number}.${newSrc}.png`;
    }
  }
}

function checkPassword(letter) {
  const beginValue = visibleLetter;
  const password = document.querySelectorAll('.password__content');
  const passwordArr = [...password];

  passwordArr.map((word) => {
    const children = [...word.children];

    children.map((char) => {
      if (char.textContent.toLowerCase() === letter) {
        char.style.visibility = 'visible';
        visibleLetter++;
      }
    });
  });

  changeImage(beginValue, game, visibleLetter);
  checkResult();
}

function checkedLetter() {
  this.classList.add('keyboard__letter--checked');
  this.style.cursor = 'default';
  this.removeEventListener('click', checkedLetter);
  checkPassword(this.textContent);
}

function renderPassword() {
  const result = checkPasswords();
  if (result) {
    randomInfo.style.display = 'block';
    return;
  }
  game.randomPasswords();
  const passwordLetters = [...game.getCurrentPassword()];

  // Create letter
  const spanArray = passwordLetters.map((letter) => {
    if (letter === ' ') {
      return `
        </p>
        <p class="password__content">
      `;
    }
    return `<span class="password__letter">${letter}</span>`;
  });

  passwordElem.innerHTML = `
      <p class="password__content">
        ${spanArray.join('')}
      </p>
    `;
  clearKeabord();
  resetImage();
}

function setCurrentCategory() {
  const activeCategory = document.querySelector('.popup__item--active');
  game.setPastPasswords(0);

  if (!randomBtn.style.opacity) randomBtn.style.opacity = '1';
  if (!keyboard.style.opacity) keyboard.style.opacity = '1';
  if (activeCategory) activeCategory.classList.remove('popup__item--active');

  game.setCurrentCategory(this.textContent);
  currentCategoryElem.textContent = this.textContent;

  this.classList.add('popup__item--active');

  startTime = Date.now();
  clearKeabord();
  renderPassword();
  resetImage();
}

function renderCategories() {
  game.categories.map((category) => {
    const li = document.createElement('li');
    li.classList.add('popup__item');
    li.textContent = category.name;
    categoriesList.appendChild(li);
  });
}

function listenerCategory() {
  const categories = document.querySelectorAll('.popup__item');

  categories.forEach((category) => {
    category.addEventListener('click', setCurrentCategory);
  });
}

function showPopUp(item) {
  const popup = item;
  popup.style.display = 'block';
}

function closePopUp(item) {
  const popup = item;
  popup.style.display = 'none';
}

categoryBtn.addEventListener('click', showPopUp.bind(null, popUp));
iconClosePopUp.addEventListener('click', closePopUp.bind(null, popUp));
iconCloseResult.addEventListener(
  'click',
  closePopUp.bind(null, resultGamePopUp),
);
closeRandomInfo.addEventListener('click', closePopUp.bind(null, randomInfo));
closeEndGame.addEventListener('click', closePopUp.bind(null, endGamePopUp));
window.addEventListener('DOMContentLoaded', listenerCategory);
randomBtn.addEventListener('click', renderPassword);
letters.forEach((letter) => {
  letter.addEventListener('click', checkedLetter);
});
renderCategories();
