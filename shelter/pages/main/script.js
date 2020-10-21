/* Overlay */
const body = document.querySelector('body');
const overlay = document.getElementById('overlay');

overlay.addEventListener('click', () => {
    const popups = document.querySelectorAll('.popup.active')
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

/* Pets */

const sliderCards = document.querySelector('[data-slider-cards]');

const pets = [
    {
      "name": "Jennifer",
      "img": "../../assets/images/pets/pets-jennifer.png",
      "type": "Dog",
      "breed": "Labrador",
      "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
      "age": "2 months",
      "inoculations": ["none"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Sophia",
      "img": "../../assets/images/pets/pets-sophia.png",
      "type": "Dog",
      "breed": "Shih tzu",
      "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
      "age": "1 month",
      "inoculations": ["parvovirus"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Woody",
      "img": "../../assets/images/pets/pets-woody.png",
      "type": "Dog",
      "breed": "Golden Retriever",
      "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
      "age": "3 years 6 months",
      "inoculations": ["adenovirus", "distemper"],
      "diseases": ["right back leg mobility reduced"],
      "parasites": ["none"]
    },
    {
      "name": "Scarlett",
      "img": "../../assets/images/pets/pets-scarlett.png",
      "type": "Dog",
      "breed": "Jack Russell Terrier",
      "description": "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
      "age": "3 months",
      "inoculations": ["parainfluenza"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Katrine",
      "img": "../../assets/images/pets/pets-katrine.png",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
      "age": "6 months",
      "inoculations": ["panleukopenia"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Timmy",
      "img": "../../assets/images/pets/pets-timmy.png",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
      "age": "2 years 3 months",
      "inoculations": ["calicivirus", "viral rhinotracheitis"],
      "diseases": ["kidney stones"],
      "parasites": ["none"]
    },
    {
      "name": "Freddie",
      "img": "../../assets/images/pets/pets-freddie.png",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
      "age": "2 months",
      "inoculations": ["rabies"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Charly",
      "img": "../../assets/images/pets/pets-charly.png",
      "type": "Dog",
      "breed": "Jack Russell Terrier",
      "description": "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
      "age": "8 years",
      "inoculations": ["bordetella bronchiseptica", "leptospirosis"],
      "diseases": ["deafness", "blindness"],
      "parasites": ["lice", "fleas"]
    }
  ];

const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

const createCards = () => {
    for (i = 0; i < 7; i++) {
        let counter = getRandomInt(7);
        //let counter = 0;
        sliderCards.insertAdjacentHTML('beforeend', 
        `<div class="slider-card" data-modal-target="#${pets[counter].name}">
        <img class="slider-card__img" src=${pets[counter].img} alt=${pets[counter].name}>
        <p class="slider-card__title">${pets[counter].name}</p>
        <button class="slider-card__button">Learn more</button>
        </div>`
        );

        body.insertAdjacentHTML('beforeend', 
        `<div class="popup" id=${pets[counter].name}>
            <button class="close-button" data-close-button><img src=../../assets/icons/icon-close.svg alt="Close"></button>
            <div class="popup__img"><img src=${pets[counter].img} alt=${pets[counter].name} class="content__img"></div>
            <div class="popup-content">
                <p class="popup-content__title">${pets[counter].name}</p>
                <p class="popup-content__subtitle">${pets[counter].type} - ${pets[counter].breed}</p>
                <p class="popup-content__info">${pets[counter].description}</p>
                <ul class="popup-content__ul">
                        <li><strong>Age: </strong>${pets[counter].age}</li>
                        <li><strong>Inoculations: </strong>${pets[counter].inoculations}</li>
                        <li><strong>Diseases: </strong>${pets[counter].diseases}</li>
                        <li><strong>Parasites: </strong>${pets[counter].parasites}</li>
                </ul>
            </div>   
        </div>`
        );
    }
}


createCards();

//window.addEventListener('load', () => {
  //  createCards();
    //window.sliderCard = document.querySelectorAll('.slider-card');
//});


/* Popup */

const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');


openModalButtons.forEach(button => { 
    button.addEventListener('click', () => {
        const popup = document.querySelector(button.dataset.modalTarget);
        openModal(popup);
    }); 
})

closeModalButtons.forEach(button => { 
    button.addEventListener('click', () => {
        const popup = button.closest('.popup')
        closeModal(popup);
    }); 
})

function openModal(popup) {
    if (popup == null) return
    popup.classList.add('active');
    overlay.classList.add('active');
}

function closeModal(popup) {
    if (popup == null) return
    popup.classList.remove('active');
    overlay.classList.remove('active');
}
