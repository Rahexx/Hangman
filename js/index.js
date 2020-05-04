import Game from './game';
import image1 from '../images/blackboard1.png';
import image2 from '../images/blackboard2.png';
import image3 from '../images/blackboard3.png';
import image4 from '../images/blackboard4.png';
import image5 from '../images/blackboard5.png';
import image6 from '../images/blackboard6.png';
import image7 from '../images/blackboard7.png';
import image8 from '../images/blackboard8.png';

const categoryBtn = document.querySelector('.list-buttons__change-category');
const randomBtn = document.querySelector('.list-buttons__random');
const popUp = document.querySelector('.popup');
const iconClosePopUp = document.querySelector('.popup__exit');
const categoriesList = document.querySelector('.popup__list');
const currentCategoryElem = document.querySelector('.header__category span');
const passwordElem = document.querySelector('.password');
const letters = document.querySelectorAll('.keyboard__letter');
const keyboard = document.querySelector('.keyboard');
const gallows = document.querySelector('.hangman__img');
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

// Create list categories
function renderCategories() {
  game.categories.map((category) => {
    const li = document.createElement('li');
    li.classList.add('popup__item');
    li.textContent = category.name;
    categoriesList.appendChild(li);
  });
}

// render password element

function renderPassword() {
  visibleLetter = 0;
  game.randomPasswords();
  const passwordLetters = [...game.getCurrentPassword()];

  // Create letter
  const spanArray = passwordLetters.map(
    (letter) => `<span class="password__letter">${letter}</span>`,
  );

  passwordElem.innerHTML = `
    <p class="password__content">
      ${spanArray.join('')}
    </p>
  `;
}

function setCurrentCategory() {
  const activeCategory = document.querySelector('.popup__item--active');
  game.setPastPasswords(0);

  if (!keyboard.style.opacity) keyboard.style.opacity = '1';
  if (activeCategory) activeCategory.classList.remove('popup__item--active');

  game.setCurrentCategory(this.textContent);
  currentCategoryElem.textContent = this.textContent;

  this.classList.add('popup__item--active');

  renderPassword();
}

function listenerCategory() {
  const categories = document.querySelectorAll('.popup__item');

  categories.forEach((category) => {
    category.addEventListener('click', setCurrentCategory);
  });
}

function showPopUp() {
  popUp.style.display = 'block';
}

function closePopUp() {
  popUp.style.display = 'none';
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

  if (!(visibleLetter !== beginValue)) {
    game.increaseMistake();
    const number = game.countMistake;
    if (number === 1) {
      gallows.style.opacity = 1;
    } else if (number < 9) {
      const newSrc = srcImages[number - 1].split('.')[1];
      gallows.src = `blackboard${number}.${newSrc}.png`;
    }
  }
}

function checkedLetter() {
  this.classList.add('keyboard__letter--checked');
  this.style.cursor = 'default';
  this.removeEventListener('click', checkedLetter);
  checkPassword(this.textContent);
}

categoryBtn.addEventListener('click', showPopUp);
iconClosePopUp.addEventListener('click', closePopUp);
window.addEventListener('DOMContentLoaded', listenerCategory);
randomBtn.addEventListener('click', renderPassword);
letters.forEach((letter) => {
  letter.addEventListener('click', checkedLetter);
});
renderCategories();
