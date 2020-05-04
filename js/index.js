import Game from './game';

const categoryBtn = document.querySelector('.list-buttons__change-category');
const randomBtn = document.querySelector('.list-buttons__random');
const popUp = document.querySelector('.popup');
const iconClosePopUp = document.querySelector('.popup__exit');
const categoriesList = document.querySelector('.popup__list');
const currentCategoryElem = document.querySelector('.header__category span');
const passwordElem = document.querySelector('.password');
const game = new Game();

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
  game.randomPasswords();
  const passwordLetters = [...game.getCurrentPassword()];

  // Create letter
  const spanArray = passwordLetters.map((letter) => {
    return `<span class="password__letter">${letter}</span>`;
  });

  passwordElem.innerHTML = `
    <p class="password__content">
      ${spanArray.join('')}
    </p>
  `;
}

function setCurrentCategory() {
  const activeCategory = document.querySelector('.popup__item--active');
  game.setPastPasswords(0);
  console.log(game.getPastPasswords());
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

categoryBtn.addEventListener('click', showPopUp);
iconClosePopUp.addEventListener('click', closePopUp);
window.addEventListener('DOMContentLoaded', listenerCategory);
randomBtn.addEventListener('click', renderPassword);

renderCategories();
