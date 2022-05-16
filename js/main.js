
const isVisible = 'is-visible';
const hidden = 'hidden';
const modalOpen = '[data-open]';
const modalClose = '[data-close]';
const modalBg = '.park-modal';
const heart = '.fa-heart';
const favorite = 'favorite';
const designation = '[data-designation]';
const sortBtn = '[data-sort]';

const favTypeContainer = document.querySelector('.fav-designation');
const favContainer = document.querySelector('.fav-container');
const favDropDown = document.querySelector('.favorites');
const favHeader = document.querySelector('.fav-header');

const favOpen = document.querySelector('.favorite-drop-down');
const favClose = document.querySelector('.close');

const onClickSort = document.querySelectorAll(sortBtn);
const favSort = document.querySelector(sortBtn);

const onStateChange = document.querySelector('.state-select');
const typeContainer = document.querySelector('.designation');
const mainContainer = document.querySelector('.parks');
const modalContainer = document.querySelector('.modal-box');

let selectedState;
let parks = [];
let favParks = [];
let modal = [];

const hideFavorites = (park) => {
    park.classList.add(hidden);
    park.classList.remove(isVisible);
}

const showFavorites = (park) => {
    park.classList.remove(hidden);
    park.classList.add(isVisible);
}

const displayFavorites = (array) => {
    for(const park of array){
        favContainer.className.includes(isVisible)
        ? showFavorites(park)
        : hideFavorites(park)
    }
}

const sortParks = (array) => {
    array.sort(function(x, y) {
        let a = x.name;
        let b = y.name;
        return a === b ? 0 : a > b ? 1 : -1;
    })
}

const reverseBtnText = (btn) => {
    if (btn.className.includes('reverse')){
        btn.innerHTML = `Sort Z - A`;
    } else {
        btn.innerHTML = `Sort A - Z`;
    }
}

onClickSort.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        if(!e.target.className.includes('reverse')){
            e.target.classList.add('reverse');
            if (e.target.dataset.sort === 'main'){
                sortParks(parks);
                renderDom(parks, mainContainer);
            } else {
                sortParks(favParks);
                renderDom(favParks, favContainer);
            }
        } else {
            e.target.classList.remove('reverse');
            if (e.target.dataset.sort === 'main'){
                sortParks(parks);
                parks.reverse();
                renderDom(parks, mainContainer);
            } else {
                sortParks(favParks);
                favParks.reverse();
                renderDom(favParks, favContainer);
            }
        }
        reverseBtnText(btn);
    })
});

const changeHeartColor = () => {
    const favHearts = favContainer.querySelectorAll(heart);
    favHearts.forEach(heart => heart.classList.add(favorite));
}

favOpen.addEventListener('click', () => {
        favContainer.classList.add(isVisible);
        favHeader.classList.add(isVisible);
        favDropDown.classList.add(isVisible);
        favSort.classList.add(isVisible);
        favSort.classList.remove(hidden);
        favTypeContainer.classList.add(isVisible);
        favTypeContainer.classList.remove(hidden);
        displayFavorites(favContainer.children);
        onParkClick(favContainer);
        getModalData(favContainer, favParks);
        findDesignationTotals(favParks, favTypeContainer);
        
})

favClose.addEventListener('click', (e) => {
        favHeader.classList.remove(isVisible);
        favContainer.classList.remove(isVisible);
        favDropDown.classList.remove(isVisible);
        favSort.classList.remove(isVisible);
        favSort.classList.add(hidden);
        favTypeContainer.classList.add(hidden);
        favTypeContainer.classList.remove(isVisible);
        displayFavorites(favContainer.children)
        onParkClick(mainContainer);
})

const displayTotal = (arr, container) => {
    container.innerHTML = " ";
    arr.forEach((type) => {
        const {name, count} = type;
        if(count > 0){
            const info = document.createElement('div');
            info.classList.add('counter');
            info.innerHTML = `
            ${name}: ${count}
            `
            container.appendChild(info);
        }
    })
}

const findDesignationTotals = (arr, container) => {
    let designations = [
        { name: 'National Park', count: 0 },
        { name: 'National Monument', count: 0 },
        { name: 'National Memorial', count: 0 },
        { name: 'Other', count: 0 },
    ];
    arr.map(park => {
        designations.forEach(type => {
            if(type.name === park.designation){
                type.count++
            }
        })
    })
    const sum = designations.reduce((acc, cur) => {
        return acc + cur.count
    }, 0);
    const otherCount = arr.length - sum;
    designations[3].count = otherCount;
    displayTotal(designations, container);
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

const addToFavorites = (parkId) => {
    const park = parks.find(park => park.id === parkId);
    favParks.push(park);
    const index = parks.indexOf(park);
    parks.splice(index, 1);
    renderDom(parks, mainContainer);
    renderDom(favParks, favContainer);
    displayFavorites(favContainer.children);
    onParkClick(mainContainer);
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

const renderDom = (array, container) => {
    container.innerHTML = '';
    array.forEach(park => {
        const {id, fullName, designation} = park;
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
                <p class="open-modal" data-open="${ id }">Learn More</p>
            </div>
             `   
            container.appendChild(parkCard);
    })
    changeHeartColor();
}

const renderModal = (park) => {
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
                    <div class="modal-links">
                        <a class="directions" href="${directionsUrl}" target="_blank">Directions</a>
                    </div
                </div>
            </div>
        </div>
        `
        modalContainer.appendChild(parkModal);
        closeModal();
}

const getModalData = (container, array) => {
    const openModal = container.querySelectorAll(modalOpen);
    openModal.forEach((card) => {
        card.addEventListener('click', (e) => {
            const parkId = e.target.dataset.open;
            const parkModal = array.find(park => park.id === parkId)
            renderModal(parkModal);
        })
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
        .then(() => getModalData(mainContainer, parks))
        .then(() => findDesignationTotals(parks, typeContainer))
        .catch((err) => console.log(err));
    });