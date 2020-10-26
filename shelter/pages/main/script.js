/* Overlay */
const body = document.querySelector('body');
const overlay = document.getElementById('overlay');

overlay.addEventListener('click', () => {
    const popups = document.querySelectorAll('.popup.active');
    popups.forEach(popup => {
      closeModal(popup);
    })

  if (openMenu === true) {
    hideMenu();
  }
})

/* Burger-menu */

let menuButton = document.getElementById('burger-menu');
let menuWindow = document.getElementById('menu-window');
let logo = document.getElementById('logo');
let openMenu = false;


menuButton.addEventListener('click', () => {

  if (openMenu === false) {
    showMenu();
  } else {
    hideMenu();
  }
});

const showMenu = () => {

  body.style.overflow = 'hidden';
  overlay.classList.add('active');
  menuButton.classList.add('active');
  menuWindow.classList.add('active');
  logo.classList.add('active');
  openMenu = true;
}

const hideMenu = () => {

  body.style.overflow = 'initial';
  overlay.classList.remove('active');
  menuButton.classList.remove('active');
  menuWindow.classList.remove('active');
  logo.classList.remove('active');
  openMenu = false;
}

/* Buttons */

const petsPageButtons = document.querySelectorAll('[data-pets-page]');
const mainPageButtons = document.querySelectorAll('[data-main-page]');

petsPageButtons.forEach(button => { button.addEventListener('click', () => document.location = '../pets/pets.html'); })
mainPageButtons.forEach(button => { button.addEventListener('click', () => document.location = 'main.html'); })

//Random
const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

/* Slider */

const sliderCards = document.querySelector('[data-slider-cards]');
let itemsPerPage = 3;
let currSet = [];
let prevSet = [];
let pets = [];

fetch('../../assets/pets.json')
    .then(res => res.json())
    .then(data => {
        pets = data;
        createPets();
        createPopups();
    })

createElements = (petsList) => {
  let str = '';
  for (let i = 0; i < petsList.length; i++) {
    str += `<div class="slider-card" data-modal-target="#${petsList[i].name}">
              <img class="slider-card__img" src=${petsList[i].img} alt=${petsList[i].name}>
              <p class="slider-card__title">${petsList[i].name}</p>
              <button class="slider-card__button">Learn more</button>
              </div>`;
  }
  return str;
}

const createPets = () => {
  petsSet = createSet();
  sliderCards.innerHTML += createElements(petsSet);
}

const createSet = () => {

  prevSet = currSet.slice();
  currSet = [];
  for (i = 0; i < itemsPerPage; i++) {
    let counter = getRandomInt(pets.length);
    if (currSet.indexOf(pets[counter]) === -1 && prevSet.indexOf(pets[counter]) === -1) {
      currSet.push(pets[counter])
    } else {
      i--;
    }
  }
  return currSet;
}

const changeSet = () => {

  while (sliderCards.firstChild) {
    sliderCards.removeChild(sliderCards.firstChild);
  }
  createPets();
}

const sliderButton = document.querySelectorAll('.slider-button');
sliderButton.forEach(button => {
  button.addEventListener('click', changeSet)
});

/* Popup */
const popupsContainer = document.querySelector('.popups-container');

const createPopups = () => {
    for (i = 0; i < pets.length; i++) {

        popupsContainer.insertAdjacentHTML('beforeend',
            `<div class="popup" id=${pets[i].name}>
            <button class="close-button" data-close-button><img src=../../assets/icons/icon-close.svg alt="Close"></button>
            <div class="popup__img"><img src=${pets[i].img} alt=${pets[i].name} class="content__img"></div>
            <div class="popup-content">
                <p class="popup-content__title">${pets[i].name}</p>
                <p class="popup-content__subtitle">${pets[i].type} - ${pets[i].breed}</p>
                <p class="popup-content__info">${pets[i].description}</p>
                <ul class="popup-content__ul">
                        <li><strong>Age: </strong>${pets[i].age}</li>
                        <li><strong>Inoculations: </strong>${pets[i].inoculations}</li>
                        <li><strong>Diseases: </strong>${pets[i].diseases}</li>
                        <li><strong>Parasites: </strong>${pets[i].parasites}</li>
                </ul>
            </div>   
        </div>`
        );
    }
}

sliderCards.addEventListener('click', function (e) {
  let cardContainer = e.target.classList.contains('card-container');
  if (e.target !== this && !cardContainer && this.contains(e.target)) {
      const popupId = e.target.closest('[data-modal-target]').dataset.modalTarget
      const popup = document.querySelector(popupId);
      //e.target.classList.add('active');
      openModal(popup);
  }
});

popupsContainer.addEventListener('click', function (e) {
  const closeButton = e.target.closest('[data-close-button]');
  if (e.target !== this && closeButton) {
      const popup = closeButton.closest('.popup');
      //e.target.classList.remove('active');
      closeModal(popup);
  }
});

function openModal(popup) {
  if (popup == null) return
  popup.classList.add('active');
  overlay.classList.add('active');
  body.style.overflow = 'hidden';
}

function closeModal(popup) {
  if (popup == null) return
  popup.classList.remove('active');
  overlay.classList.remove('active');
  body.style.overflow = 'initial';
}