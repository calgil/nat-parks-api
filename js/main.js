
const isVisible = 'is-visible';
const modalOpen = '[data-open]';
const modalClose = '[data-close]';
const modalBg = '.park-modal';
const heart = '.fa-heart';

const favContainer = document.querySelector('.favorites');
const favTarget = document.querySelector('.favorite-drop-down');

const container = document.querySelector('.parks');
const modalContainer = document.querySelector('.modal-box');

const stateFilter = document.querySelector('.state-filter');


const favorites = [];

const makeFavorites = (favorites) => {
    console.log('up',favorites);
    favorites.forEach((park) => {
        favContainer.appendChild(park)
        console.log('Here', park);
    })
}

const findHearts = () => {
    const hearts = document.querySelector(heart);
    hearts.addEventListener('click', (e) => {
        e.target.classList.add('favorite');
        const modal = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.cloneNode(true);
        favorites.push(modal);
    })
    makeFavorites(favorites);
}

favTarget.addEventListener('click', (e)=> {
    if(e.target.className.includes(isVisible)){
        e.target.classList.remove(isVisible);
        favContainer.classList.remove(isVisible);
    } else {
        favContainer.classList.add(isVisible);
        e.target.classList.add(isVisible);
    }
})

// const favDropDown = () => {

// }

const closeModal = () => {
    document.addEventListener('keyup', (e) => {
        if(e.key === 'Escape'){
            modalContainer.innerHTML = '';
        }
    });
    document.addEventListener('click', (e) => {
        if(e.target === document.querySelector(modalBg)){
            modalContainer.innerHTML = '';
        }
    })
    const closeModalButton = document.querySelector(modalClose);
    closeModalButton.addEventListener('click', () => {
        modalContainer.innerHTML = '';
    });
};

const getParkCode = () => {
    let openModal = container.childNodes;
    openModal.forEach((park) => {
        park.addEventListener('click', (e) => {
            if(e.target.dataset.open === null || e.target.dataset.open === undefined) {
                parkCode = e.target.parentElement.dataset.open
            } else {
                parkCode = e.target.dataset.open;
            }
            makeModal(parkCode);
        })
    })
}

stateFilter.addEventListener('change', (e) => {
    const value = e.target.value.toLowerCase();
    const endpoint = fetch(`https://developer.nps.gov/api/v1/parks?stateCode=${ value }&api_key=2hL7WMh7PeKnrwR39LONcMrAMvibH0MiBL8QMMSH`);
    endpoint
        .then((res) => res.json())
        .catch((err) => console.log(err))
        .then((res) => { 
            container.innerHTML = '';
            res.data.forEach(park => {
                const {fullName, parkCode} = park;
                const {altText, url} = park.images[0];
                const parkCard = document.createElement('div');
                parkCard.classList.add(`park`);
                parkCard.innerHTML = `
                <div class="img-wrapper">
                    <img class="park-img" src="${url}" alt ="${altText}">
                </div>
                <div class="card-text">
                    <p class ="park-name">
                    ${fullName}
                    </p>
                </div>
                <div class="card-popup" data-open="${parkCode}">
                    <p>Click to learn more about ${fullName}</p>
                </div>
            `
                container.appendChild(parkCard);
            })
        })
        .then( ()=> getParkCode());
    })

const makeModal = (parkCode) => {
    const endpoint = fetch(`https://developer.nps.gov/api/v1/parks?parkCode=${ parkCode }&api_key=2hL7WMh7PeKnrwR39LONcMrAMvibH0MiBL8QMMSH`);
    endpoint
    .then((res) => res.json())
    .catch((err) => console.log(err))
    .then((res) => {
        res.data.forEach(park => {
            const {fullName, description, directionsUrl} = park;
            const {altText, url} = park.images[1];
            const parkModal = document.createElement('div');
            parkModal.classList.add('park-modal');
            parkModal.innerHTML = `
            
            <div class="modal-dialog">
                <div class="modal-header">
                     <h3> ${fullName} </h3>
                     <i class="fas fa-times" data-close></i>
                </div>
                <div class="modal-body">
                    <div class="modal-img-wrapper">
                        <img src="${ url }" alt="${ altText }">
                    </div>
                    <div class="text-wrapper">
                        <p>
                            ${description}
                        </p>
                        <div class="modal-links">
                            <a class="directions" href="${directionsUrl}">Directions</a>
                            <i class="fa-solid fa-heart"></i>
                        </div>
                        
                    </div>
                </div>
            </div>
            `
            modalContainer.appendChild(parkModal);
        })
    })
    .then(() => closeModal())
    .then(() => findHearts())
}





