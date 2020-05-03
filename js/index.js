import Game from './game';

const categoryBtn = document.querySelector('.list-buttons__change-category');
const popUp = document.querySelector('.popup');
const iconClosePopUp = document.querySelector('.popup__exit');
const game = new Game();

function showPopUp() {
  popUp.style.display = 'block';
}

function closePopUp() {
  popUp.style.display = 'none';
}

categoryBtn.addEventListener('click', showPopUp);
iconClosePopUp.addEventListener('click', closePopUp);
