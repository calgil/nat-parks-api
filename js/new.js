
const isVisible = 'is-visible';
const hidden = 'hidden';

let selectedState;
let parks = [];
let favParks = [];

const onStateChange = document.querySelector('.state-filter');
const mainContainer = document.querySelector('.parks');
const favContainer = document.querySelector('.fav-container');

const favHeader = document.querySelector('.fav-header');
const favOpen = document.querySelector('.favorite-drop-down');
const favClose = document.querySelector('.close');
const favDropDown = document.querySelector('.favorites');


const hideFavorites = (park) => {
    park.classList.add(hidden);
    park.classList.remove(isVisible);
}

const showFavorites = (park) => {
    park.classList.remove(hidden);
    park.classList.add(isVisible);
}

const displayFavorites = (parks) => {
    for(const park of parks){
        favContainer.className.includes(isVisible)
        ? showFavorites(park)
        : hideFavorites(park)
    }
}

favOpen.addEventListener('click', () => {
        favContainer.classList.add(isVisible);
        favHeader.classList.add(isVisible);
        favDropDown.classList.add(isVisible);
        displayFavorites(favContainer.children);
        onParkClick(favContainer);
})

favClose.addEventListener('click', (e) => {
    if(e.target.parentElement.className.includes(isVisible)){
        e.target.parentElement.classList.remove(isVisible);
        favContainer.classList.remove(isVisible);
        favDropDown.classList.remove(isVisible);
        for(const card of favContainer.children) {
            card.classList.remove(isVisible);
            card.classList.add(hidden);
        }
    }
    onParkClick(mainContainer);
})

const addToFavorites = (parkId) => {
    const park = parks.find(park => park.id === parkId);
    favParks.push(park);
    const index = parks.indexOf(park);
    parks.splice(index, 1);
    renderDom(parks, mainContainer);
    renderDom(favParks, favContainer);
    displayFavorites(favContainer.childNodes);
    onParkClick(mainContainer);
}

const removeFromFavorites = (parkId) => {
    const park = favParks.find(park => park.id === parkId);
    if(park.states === selectedState){
        parks.push(park);
    }
    const index = favParks.indexOf(park);
    favParks.splice(index, 1);
    renderDom(parks, mainContainer);
    renderDom(favParks, favContainer);
    onParkClick(favContainer);
}

const onParkClick = (container) => {
    const hearts = container.querySelectorAll('[data-fav]');
    hearts.forEach((heart) => {
        heart.addEventListener('click', (e) => {
            const parkId = e.target.dataset.fav;
            container === mainContainer
            ? addToFavorites(parkId)
            : removeFromFavorites(parkId);
        })
    })
}

const renderDom = (array, container) => {
    container.innerHTML = '';
    array.forEach(park => {
        const {id, fullName, parkCode, designation} = park;
        const {altText, url} = park.images[0];
            const parkCard = document.createElement('div');
            parkCard.classList.add(`park`);
            parkCard.setAttribute("id", `${ id }`);
            parkCard.innerHTML = `
            <div class="img-wrapper" data-designation="${ designation }">
            <img class="park-img" src="${ url }" alt ="${ altText }"></img>
            </div>
            <div class="card-text">
                <p class="park-name">${ fullName }</p>
                <i class="fa-solid fa-heart" data-fav="${ id }"></i>
                <p class="open-modal" data-open="${ parkCode }">Learn More</p>
            </div>
             `   
            container.appendChild(parkCard);
    })
}

onStateChange.addEventListener('change', (e) => {
    selectedState = e.target.value;
    const value = e.target.value.toLowerCase();
    const endpoint = fetch(`https://developer.nps.gov/api/v1/parks?stateCode=${ value }&api_key=2hL7WMh7PeKnrwR39LONcMrAMvibH0MiBL8QMMSH`);
    endpoint
        .then((res) => res.json())
        .then((res) => parks = res.data)
        .then(() => renderDom(parks, mainContainer))
        .then(() => onParkClick(mainContainer))
        .catch((err) => console.log(err));
    });