
const isVisible = 'is-visible';
const hidden = 'hidden';

let parks = [];
let favParks = [];

const onParkChange = document.querySelector('.state-filter');
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
    const favCards = favContainer.children;
        favContainer.classList.add(isVisible);
        favHeader.classList.add(isVisible);
        favDropDown.classList.add(isVisible);
        displayFavorites(favCards);
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
})


// Dumb! Undefined value is being passed in!!!

const addToFavorites = (parkId) => {
    console.log(`add ${parkId}`);
    const park = parks.find(park => park.id === parkId);
    console.log(park);
    favParks.push(park);
    console.log(favParks);
    const index = parks.indexOf(park);
    parks.splice(index, 1);
    // renderDom(parks, mainContainer);
    // renderDom(favParks, favContainer);
    // displayFavorites(favContainer.childNodes);
}

const removeFromFavorites = (parkId) => {
    console.log(`remove ${parkId}`);
}


const onParkClick = (container) => {
    const hearts = container.querySelectorAll('[data-fav]');
    hearts.forEach((heart) => {
        heart.addEventListener('click', (e) => {
            const parkId = e.target.dataset.fav;
            console.log('click',parkId);
            container === mainContainer
            ? addToFavorites(parkId)
            : removeFromFavorites(parkId);
        })
    })
}

// const onFavParkClick = (array) => {
//     const hearts = favContainer.querySelectorAll('[data-fav]');
// }


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
    onParkClick(mainContainer);
}


onParkChange.addEventListener('change', (e) => {
    const value = e.target.value.toLowerCase();
    const endpoint = fetch(`https://developer.nps.gov/api/v1/parks?stateCode=${ value }&api_key=2hL7WMh7PeKnrwR39LONcMrAMvibH0MiBL8QMMSH`);
    endpoint
        .then((res) => res.json())
        .then((res) => parks = res.data)
        .then(() => renderDom(parks, mainContainer))
        .catch((err) => console.log(err));
        
    });