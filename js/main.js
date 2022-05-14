
const isVisible = 'is-visible';
const hidden = 'hidden';
const modalOpen = '[data-open]';
const modalClose = '[data-close]';
const modalBg = '.park-modal';
const heart = '.fa-heart';
const favPark = 'fav-park';
const favorite = 'favorite';
const designation = '[data-designation]';

let parks = [];
let favParks = [];
let modal = [];

const favDropDown = document.querySelector('.favorites');
const favHeader = document.querySelector('.fav-header');
const favContainer = document.querySelector('.fav-container');
// const favTypeContainer = document.querySelector('fav-designation');

const favOpen = document.querySelector('.favorite-drop-down');
const favClose = document.querySelector('.close');

const typeContainer = document.querySelector('.designation');
const mainContainer = document.querySelector('.parks');
const modalContainer = document.querySelector('.modal-box');
const stateFilter = document.querySelector('.state-filter');


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

const displayTotal = (countArr) => {
    typeContainer.innerHTML = " ";
    countArr.forEach((type) => {
        const {name, count} = type;
        if(count > 0){
            const info = document.createElement('div');
            info.classList.add('counter');
            info.innerHTML = `
            ${name}: ${count}
            `
            typeContainer.appendChild(info);
        }
    })
}

const findTotal = () => {
    const typeCounts = [
        natPark = {
            name: 'National Parks',
            count: 0
        },
         natMonument = {
            name: 'National Monuments',
            count: 0
        },
         natMemorial = {
            name: 'National Memorials',
            count: 0
        },
         other = {
            name: 'Other',
            count: 0
        }
    ];
    const designations = document.querySelectorAll(designation);
    for(const park of designations){
        const parkType = park.dataset.designation;
        if(parkType.includes('National Park')){
            typeCounts[0].count++
        } else if(parkType.includes('National Monument')){
            typeCounts[1].count++
        } else if (parkType.includes('National Memorial')){
            typeCounts[2].count++
        } else { typeCounts[3].count++ }
    }
    displayTotal(typeCounts);
};



const favoritesClick = () => {
    const hearts = mainContainer.querySelectorAll('[data-fav]');
    hearts.forEach((heart) => {
        heart.addEventListener('click', (e) => {
            console.log('click');
            const parkId = e.target.dataset.fav;
            let favPark = parks.find(park => park.id === parkId);
            favParks.includes(favPark)
            ? removeFromFavorites(favPark)
            : addToFavorites(favPark)

        })
    })
}


const removeFromFavorites = (park) => {
    console.log('remove',favParks.includes(park));


};

// const removeFavId = (parkId) => {
//     console.log('id!', parkId);
//     const index = favIds.indexOf(parkId);
//     console.log('index', index);
//     favIds.splice(index, 1);
//     console.log('remove',favIds);
// };



const addToFavorites = (park) => {


    // favParks.push(park);
    // const index = parks.indexOf(park);
    // parks.splice(index, 1);
    // renderDom(parks, mainContainer);
    // renderDom(favParks, favContainer);
    // displayFavorites(favContainer.childNodes);
};



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


// Think get modal index instead and build the modal from the data you already have.
// Should be able to do most of the heavy lifting here

// const getModalData = () => {
//     const openModal = document.querySelectorAll(modalOpen);
//     openModal.forEach((card) => {
//         card.addEventListener('click', (e) => {
//             const parkId = e.target.dataset.open;
//             makeModal(parkId);
//         })
//     })
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
    favoritesClick();
}

//  especially if I get the index of parks

// const renderModal = (array) => {
//     array.forEach(park => {
//         const {fullName, description, directionsUrl} = park;
//         const {altText, url} = park.images[1];
//         const parkModal = document.createElement('div');
//         parkModal.classList.add('park-modal');
//         parkModal.innerHTML = `
        
//         <div class="modal-dialog">
//             <div class="modal-header">
//                  <h3> ${fullName} </h3>
//                  <i class="fas fa-times" data-close></i>
//             </div>
//             <div class="modal-body">
//                 <div class="modal-img-wrapper">
//                     <img src="${ url }" alt="${ altText }">
//                 </div>
//                 <div class="text-wrapper">
//                     <p>${description}</p>
//                     <div class="modal-links">
//                         <a class="directions" href="${directionsUrl}" target="_blank">Directions</a>
//                     </div
//                 </div>
//             </div>
//         </div>
//         `
//         modalContainer.appendChild(parkModal);
//     })
// }

// This function should disappear

stateFilter.addEventListener('change', (e) => {
    const value = e.target.value.toLowerCase();
    const endpoint = fetch(`https://developer.nps.gov/api/v1/parks?stateCode=${ value }&api_key=2hL7WMh7PeKnrwR39LONcMrAMvibH0MiBL8QMMSH`);
    endpoint
        .then((res) => res.json())
        .catch((err) => console.log(err))
        .then((res) => parks = res.data)
        .then(() => renderDom(parks, mainContainer))
        
    });



    // .then(() => findTotal())
    // .then( ()=> getModalData())




// I already have this data. just gotta render it

// const makeModal = (parkCode) => {
//     modalContainer.innerHTML = '';
//     const endpoint = fetch(`https://developer.nps.gov/api/v1/parks?parkCode=${ parkCode }&api_key=2hL7WMh7PeKnrwR39LONcMrAMvibH0MiBL8QMMSH`);
//     endpoint
//     .then((res) => res.json())
//     .catch((err) => console.log(err))
//     .then((res) => modal = res.data)
//     .then(() => renderModal(modal))
//     .then(() => closeModal())
// }