/* Overlay */
const body = document.querySelector('body');
const header = document.querySelector('header');
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


/* Buttons */
const mainPageButtons = document.querySelectorAll('[data-main-page]');
mainPageButtons.forEach(button => { button.addEventListener('click', () => document.location = '../main/main.html'); })

//Random
const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

/* Burger-menu */
let menuButton = document.getElementById('burger-menu');
let menuWindow = document.getElementById('menu-window');
let openMenu = false;

menuButton.addEventListener('click', () => {

    if (openMenu === false) {
        showMenu();
    } else {
        hideMenu();
    }
});

const showMenu = () => {
    body.style.overflowY = 'hidden';
    header.classList.add('active');
    overlay.classList.add('active');
    menuButton.classList.add('active');
    menuWindow.classList.add('active');
    menuWindow.classList.add('main');
    logo.classList.add('active', 'main');
    openMenu = true;
}

const hideMenu = () => {
    body.style.overflowY = 'initial';
    header.classList.remove('active');
    overlay.classList.remove('active');
    menuWindow.classList.remove('active', 'main');
    logo.classList.remove('active', 'main');
    menuButton.classList.remove('active');
    openMenu = false;
}

// Pagination
const sliderCards = document.querySelector('[data-slider-cards]');
let pets = [];
let fullPetsList = [];
let currentPage = 1;
let itemsPerPage = 8;

const checkItemsPerPage = () => {
    if (body.offsetWidth > 768 && body.offsetWidth < 1280) {
        itemsPerPage = 6;
    } else if (body.offsetWidth < 768) {
        itemsPerPage = 3;
    }
}

window.addEventListener(`resize`, () => {
    currentPage = 1;
    curPageBtn.innerHTML = currentPage;
    prevPageBtn.setAttribute('disabled', 'disabled');
    firstPageBtn.setAttribute('disabled', 'disabled');
    nextPageBtn.removeAttribute('disabled', 'disabled');
    lastPageBtn.removeAttribute('disabled', 'disabled');
    itemsPerPage = 8;
    checkItemsPerPage();
    changeImgSet(currentPage, itemsPerPage);
});

fetch('../../assets/pets.json')
    .then(res => res.json())
    .then(data => {
        pets = data;
        fullPetsList = (() => {
            let tempArr = [];

            for (let i = 0; i < 6; i++) {
                const newPets = pets;

                for (let j = pets.length; j > 0; j--) {
                    let randInd = Math.floor(Math.random() * j);
                    const randElem = newPets.splice(randInd, 1)[0];
                    newPets.push(randElem);
                }

                tempArr = [...tempArr, ...newPets];
            }
            return tempArr;
        })();

        fullPetsList = sort863(fullPetsList);

        createPets(fullPetsList);
        createPopups();
        checkItemsPerPage();
        changeImgSet(currentPage, itemsPerPage);
    })

const createPets = (petsList) => {
    sliderCards.innerHTML += createElements(petsList);
}

createElements = (petsList) => {
    let str = '';
    for (let i = 0; i < petsList.length; i++) {
        str += `<div class="card-container">
                    <div class="slider-card" data-modal-target="#${petsList[i].name}">
                        <img class="slider-card__img" src=${petsList[i].img} alt=${petsList[i].name}>
                        <p class="slider-card__title">${petsList[i].name}</p>
                        <button class="slider-card__button">Learn more</button>
                    </div>
                </div>`;
    }

    return str;
}

const sort863 = (list) => {
    let unique8List = [];
    let length = list.length;
    for (let i = 0; i < length / 8; i++) {
        const uniqueStepList = [];
        for (j = 0; j < list.length; j++) {
            if (uniqueStepList.length >= 8) {
                break;
            }
            const isUnique = !uniqueStepList.some((item) => {
                return item.name === list[j].name;
            });
            if (isUnique) {
                uniqueStepList.push(list[j]);
                list.splice(j, 1);
                j--;
            }
        }
        unique8List = [...unique8List, ...uniqueStepList];
    }
    list = unique8List;

    list = sort6recursively(list);
    return list;
}

const sort6recursively = (list) => {
    const length = list.length;

    for (let i = 0; i < (length / 6); i++) {
        const stepList = list.slice(i * 6, (i * 6) + 6);

        for (let j = 0; j < 6; j++) {
            const duplicatedItem = stepList.find((item, ind) => {
                return item.name === stepList[j].name && (ind !== j);
            });

            if (duplicatedItem !== undefined) {
                const ind = (i * 6) + j;
                const which8OfList = Math.trunc(ind / 8);

                list.splice(which8OfList * 8, 0, list.splice(ind, 1)[0]);

                sort6recursively(list);
            }
        }
    }
    return list;
}

const firstPageBtn = document.querySelector('.first-page');
const prevPageBtn = document.querySelector('.previous-page');
const nextPageBtn = document.querySelector('.next-page');
const lastPageBtn = document.querySelector('.last-page');
const curPageBtn = document.querySelector('.current-page');
curPageBtn.innerHTML = currentPage;

const changeImgSet = (currentPage, itemsPerPage) => {
    let sliderItems = sliderCards.children;
    let startAdd = (currentPage - 1) * itemsPerPage;
    let endAdd = (currentPage - 1) * itemsPerPage + itemsPerPage;

    for (let j = 0; j < sliderItems.length; j++) {
        sliderItems[j].classList.remove('active');
    }
    for (let i = startAdd; i < endAdd; i++) {
        sliderItems[i].classList.add('active');
    }
}

nextPageBtn.addEventListener('click', () => {
    checkItemsPerPage();
    let pagesCount = fullPetsList.length / itemsPerPage;
    console.log(`pagesCount: ${pagesCount}`);
    if (currentPage < pagesCount) {
        currentPage++;
        changeImgSet(currentPage, itemsPerPage)
        prevPageBtn.removeAttribute('disabled');
        firstPageBtn.removeAttribute('disabled');
        console.log(`currentPage: ${currentPage}`);
        curPageBtn.innerHTML = currentPage;
        if (currentPage === pagesCount) {
            nextPageBtn.setAttribute('disabled', 'disabled');
            lastPageBtn.setAttribute('disabled', 'disabled');
        }
    }
})

prevPageBtn.addEventListener('click', () => {
    checkItemsPerPage();
    let pagesCount = fullPetsList.length / itemsPerPage;
    console.log(`pagesCount: ${pagesCount}`);
    if (currentPage > 1) {
        currentPage--;
        changeImgSet(currentPage, itemsPerPage)
        nextPageBtn.removeAttribute('disabled');
        lastPageBtn.removeAttribute('disabled');
        console.log(`currentPage: ${currentPage}`);
        curPageBtn.innerHTML = currentPage;
        if (currentPage === 1) {
            prevPageBtn.setAttribute('disabled', 'disabled');
            firstPageBtn.setAttribute('disabled', 'disabled');
        }
    }
})

lastPageBtn.addEventListener('click', () => {
    checkItemsPerPage();
    let pagesCount = fullPetsList.length / itemsPerPage;
    console.log(`pagesCount: ${pagesCount}`);
    if (currentPage < pagesCount) {
        currentPage = pagesCount;
        changeImgSet(currentPage, itemsPerPage);
        prevPageBtn.removeAttribute('disabled');
        firstPageBtn.removeAttribute('disabled');
        console.log(`currentPage: ${currentPage}`);
        curPageBtn.innerHTML = currentPage;
        if (currentPage === pagesCount) {
            nextPageBtn.setAttribute('disabled', 'disabled');
            lastPageBtn.setAttribute('disabled', 'disabled');
        }
    }
})

firstPageBtn.addEventListener('click', () => {
    checkItemsPerPage();
    let pagesCount = fullPetsList.length / itemsPerPage;
    console.log(`pagesCount: ${pagesCount}`);
    if (currentPage > 1) {
        currentPage = 1;
        changeImgSet(currentPage, itemsPerPage);
        nextPageBtn.removeAttribute('disabled');
        lastPageBtn.removeAttribute('disabled');
        console.log(`currentPage: ${currentPage}`);
        curPageBtn.innerHTML = currentPage;
        if (currentPage === 1) {
            prevPageBtn.setAttribute('disabled', 'disabled');
            firstPageBtn.setAttribute('disabled', 'disabled');
        }
    }
})

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
        openModal(popup);
    }
});

popupsContainer.addEventListener('click', function (e) {
    const closeButton = e.target.closest('[data-close-button]');
    if (e.target !== this && closeButton) {
        const popup = closeButton.closest('.popup');
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