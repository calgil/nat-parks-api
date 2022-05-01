
const isVisible = 'is-visible';
const modalOpen = 'data-open';

const container = document.querySelector('.parks');

const stateFilter = document.querySelector('.state-filter');

// Part that works

// stateFilter.addEventListener('change', (e) => {
//     const value = e.target.value.toLowerCase();
//     const parksByState = fetch(`https://developer.nps.gov/api/v1/parks?stateCode=${value}&api_key=2hL7WMh7PeKnrwR39LONcMrAMvibH0MiBL8QMMSH`);
//     parksByState
// .then((res) => res.json())
// .then((res) => { 
//     container.innerHTML = '';
//     res.data.forEach(park => {
//         const {fullName, parkCode} = park;
//         const {altText, url} = park.images[0];
//         const parkCard = document.createElement('div');
//         parkCard.classList.add(`park`);
//         parkCard.innerHTML = `
//         <div class="img-wrapper">
//             <img class="park-img" src="${url}" alt ="${altText}">
//         </div>
//        <div class="card-text" data-open="${[parkCode]}">
//             <p class ="park-name">
//             ${fullName}
//             </p>
//        </div>
//        `
//         container.appendChild(parkCard);
//     });
// });
// })

// Part I'm messing with

const openModal = () => {
    const parks = document.querySelectorAll(modalOpen);
    console.log(parks);
    // parks.addEventListener('click' , )
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
            <div class="card-text" data-open="${[parkCode]}">
                    <p class ="park-name">
                    ${fullName}
                    </p>
            </div>
            `
                container.appendChild(parkCard);
            });
        });
        openModal()
    })


// stateFilter.addEventListener('change', (e) => {
    // const value = e.target.value.toLowerCase();
    // const parksByState = fetch(`https://developer.nps.gov/api/v1/parks?stateCode=${value}&api_key=2hL7WMh7PeKnrwR39LONcMrAMvibH0MiBL8QMMSH`);
// parksByState
// .then((res) => res.json())
// .then((res) => { 
//     container.innerHTML = '';
//     res.data.forEach(park => {
//         const {fullName, parkCode} = park;
//         const {altText, url} = park.images[0];
//         const parkCard = document.createElement('div');
//         parkCard.classList.add('park', `data-open="${[parkCode]}"`);
//         parkCard.innerHTML = `
//         <div class="img-wrapper">
//             <img class="park-img" src="${url}" alt ="${altText}">
//         </div>
//        <div class="card-text">
//             <p class ="park-name">
//             ${fullName}
//             </p>
//        </div>
//        `
//         container.appendChild(parkCard);
//     });
// });

// })

// setTimeout(() => {
//     const openModal = document.querySelectorAll('.park');

//     console.log(openModal);
// }, 2000)




// for (const elm of openModal) {
//     console.log(elm);
//     // elm.addEventListener('click', function(){
//     //     const parkCode = this.dataset.open;
//     //     this.classList.add(isVisible)
//     // })
// }




