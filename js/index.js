import Game from './game';

const categoryBtn = document.querySelector('.list-buttons__change-category');
const popUp = document.querySelector('.popup');
const iconClosePopUp = document.querySelector('.popup__exit');
const categoriesList = document.querySelector('.popup__list');
const currentCategory = document.querySelector('.header__category span');
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

// Set new current category

function setCurrentCategory() {
  const activeCategory = document.querySelector('.popup__item--active');
  if (activeCategory) activeCategory.classList.remove('popup__item--active');

  game.currentCategory = this.textContent;
  currentCategory.textContent = this.textContent;

  this.classList.add('popup__item--active');
}

function listenerCategory() {
  const categories = document.querySelectorAll('.popup__item');

  categories.forEach((category) => {
    category.addEventListener('click', setCurrentCategory);
  });
}

// Pop up open/closed
function showPopUp() {
  popUp.style.display = 'block';
}

function closePopUp() {
  popUp.style.display = 'none';
}

categoryBtn.addEventListener('click', showPopUp);
iconClosePopUp.addEventListener('click', closePopUp);
window.addEventListener('DOMContentLoaded', listenerCategory);

renderCategories();
