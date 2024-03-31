const CARDS_ELEMENT = document.querySelector('[data-cards]');
const CARD_TEMPLATE = document.querySelector('[data-card-template]');
const CARD_ELEMENT = CARD_TEMPLATE.content.querySelector('[data-card]');
const CARD_IMG_ELEMENT = CARD_TEMPLATE.content.querySelector('[data-card-img]');
const CARD_TITLE_ELEMENT = CARD_TEMPLATE.content.querySelector('[data-card-title]');
const CARD_DESCRIPTION_ELEMENT = CARD_TEMPLATE.content.querySelector('[data-card-discription]');
const CARD_PRICE_ELEMENT = CARD_TEMPLATE.content.querySelector('[data-card-price]');
const CARD_LIKE_ELEMENT = CARD_TEMPLATE.content.querySelector('[data-card-like]');
const CARD_LIKE_ACTIVE_ELEMENT = CARD_TEMPLATE.content.querySelector('[data-card-like-svg');

const getData = fetch('https://api.escuelajs.co/api/v1/products');

function loadingSwitch(switching) {
    const LOADING_ELEMENT = document.querySelector('[data-loading]');
    LOADING_ELEMENT.style.visibility = switching ? 'visible' : 'hidden';
}

function createCard(data) {
    data.forEach(element => {
        CARD_IMG_ELEMENT.src = element.images[0] && "https://placehold.co/300x300";
        CARD_ELEMENT.id = element.id;
        CARD_TITLE_ELEMENT.innerText = element.title;
        CARD_DESCRIPTION_ELEMENT.innerText = element.description.slice(0, 150) + '...'
        CARD_PRICE_ELEMENT.innerText = `${element.price} $`;
        CARD_LIKE_ELEMENT.setAttribute('name', element.id);
        if (localStorage.getItem(element.id)) {
            CARD_LIKE_ACTIVE_ELEMENT.classList.add('card__like-active');
        } else {
            CARD_LIKE_ACTIVE_ELEMENT.classList.remove('card__like-active');
        }
        CARDS_ELEMENT.append(CARD_TEMPLATE.content.cloneNode(true));
    })
}

function handleClick(event) {
    const cardSection = event.target.closest('[data-card]');
    const cardId = cardSection.getAttribute('id');
    const svgElement = cardSection.querySelector('svg');
    if (svgElement.classList.contains('card__like-active')) {
        svgElement.classList.remove('card__like-active');
    } else {
        svgElement.classList.add('card__like-active');
    }
    if (localStorage.getItem(cardId)) {
        localStorage.removeItem(cardId)
    } else {
        localStorage.setItem(cardId, cardId)
    }
}

function addEventListering() {
    const likesBtn = document.querySelectorAll('[data-card-like]');
    likesBtn.forEach((element) => element.addEventListener('click', handleClick))
}

function init() {
    loadingSwitch(true);
    getData.then(response => response.json())
        .then(data => createCard(data))
        .then(() => addEventListering())
        .finally(() => loadingSwitch(false));
}

init();
