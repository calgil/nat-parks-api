
const isVisible = 'is-visible';
const hidden = 'hidden';
const modalOpen = '[data-open]';
const modalClose = '[data-close]';
const modalBg = '.park-modal';
const heart = '.fa-heart';
const favPark = 'fav-park';

const favDropDown = document.querySelector('.favorites');
const favHeader = document.querySelector('.fav-header');
const favContainer = document.querySelector('.fav-container');
const favOpen = document.querySelector('.favorite-drop-down');
const favClose = document.querySelector('.close');

const container = document.querySelector('.parks');
const modalContainer = document.querySelector('.modal-box');

const stateFilter = document.querySelector('.state-filter');


const favorites = [];
// const favNames = [];
const unique = [];

// const removeDuplicates = (favorites) => {
//     console.log('favorites', favorites);
//     favorites.forEach((fav) => {
//         const name = fav.children[1].children[0].innerHTML
//         if(unique.includes(name)){
//             console.log('duplicate');
//         } else {
//             unique.push(name)
//         }
//     });
//     makeFavorites(unique)
//     console.log('unique',unique);
// };

const makeFavorites = (favorites) => {
    for(const fav of favorites) {
        fav.classList.add(hidden);
        favContainer.appendChild(fav);
    };
};

const addToFavorites = () => {
    // const favorites = [];
    const favParksNode = document.querySelectorAll('.park.fav-park');
    favParksNode.forEach((fav) => {
        // const favClone = fav.cloneNode(true);
        if(favorites.length === 0){
            favorites.push(fav)
        } else if (favorites.includes(fav)) {
            console.log('duplicate');
        } else {
            
            favorites.push(fav);
        }
    });
    makeFavorites(favorites);
};

const findHearts = () => {
    const hearts = document.querySelectorAll(heart);
    hearts.forEach((heart) => {
        heart.addEventListener('click', (e) => {
            if(e.target.className.includes('favorite')){
                e.target.classList.remove('favorite')
                e.target.parentElement.parentElement.classList.remove('fav-park')
            } else {
                e.target.classList.add('favorite');
                e.target.parentElement.parentElement.classList.add('fav-park')
            }
            addToFavorites();    
        })
        
    })
    
}

const displayFavorites = (parks) => {
    for(const park of parks){
        if(favContainer.className.includes(isVisible)){
            park.classList.remove(hidden);
            park.classList.add(isVisible);
        } else if(park.className.includes(isVisible)){
            park.classList.remove(isVisible);
            park.classList.add(hidden)
        }
        // for(const fav of favContainer.children){
        //     const name = fav.children[1].children[0]
        //     favNames.push(name);
        // }
        // console.log('favNames',favNames);
        // console.log('here!', park.children[1].children[0]);
    }
    // console.log('trying to just make one of each',parks);
    
    getParkCode();
}

favOpen.addEventListener('click', (e)=> {
    const favCards = favContainer.children;
        favContainer.classList.add(isVisible);
        favHeader.classList.add(isVisible)
        favDropDown.classList.add(isVisible)
    displayFavorites(favCards)
})

favClose.addEventListener('click', (e) => {
    if(e.target.parentElement.className.includes(isVisible)){
        e.target.parentElement.classList.remove(isVisible);
        favContainer.classList.remove(isVisible);
        favDropDown.classList.remove(isVisible);
        for(const card of favContainer.children) {
            card.classList.remove(isVisible);
            card.classList.add(hidden)
        }
    }
})

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
    const openModal = document.querySelectorAll(modalOpen);
    openModal.forEach((card) => {
        card.addEventListener('click', (e) => {
            const parkCode = e.target.dataset.open;
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
                    <i class="fa-solid fa-heart"></i>
                    <p class="open-modal" data-open="${parkCode}">Learn More</p>
                </div>
            `
                container.appendChild(parkCard);
            })
        })
        .then(() => findHearts())
        .then( ()=> getParkCode())
        
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
                        <p>${description}</p>
                        <a class="directions" href="${directionsUrl}" target="_blank">Directions</a>
                    </div>
                </div>
            </div>
            `
            modalContainer.appendChild(parkModal);
        })
    })
    .then(() => closeModal())
    
}





