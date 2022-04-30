

const container = document.querySelector('.parks');

const stateFilter = document.querySelector('.state-filter');

stateFilter.addEventListener('change', (e) => {
    const value = e.target.value.toLowerCase();
    const parksByState = fetch(`https://developer.nps.gov/api/v1/parks?stateCode=${value}&api_key=2hL7WMh7PeKnrwR39LONcMrAMvibH0MiBL8QMMSH`);
    parksByState
.then((res) => res.json())
.then((res) => { 
    container.innerHTML = '';
    res.data.forEach(park => {
        const {fullName, directionsUrl, description} = park;
        const {altText, url} = park.images[0];
        const {modalAltText, modalUrl} = park.images[1];
        const parkCard = document.createElement('div');
        parkCard.classList.add('park');
        parkCard.innerHTML = `
        <div class="img-wrapper">
            <img class="park-img" src="${url}" alt ="${altText}">
        </div>
       <div class="card-text">
            <p class ="park-name">
            ${fullName}
            </p>
       </div>
       `
    //    <div class="modal">
    //     <div class="modal-img">
    //         <img src="${modalUrl}" alt="${modalAltText}">
    //     </div>
    //     <div class="park-details">
    //         <p class="description">
    //             ${description}
    //         </p>
    //         <p class="directions">
    //             <a class="directions" href="${directionsUrl}"> Directions </a> 
    //         </p>
    //     </div>
    //    </div>
        container.appendChild(parkCard)
    });
});
})

 






// Where I am trying to get to the data I want
// parksByState
// .then((res) => res.json())
// .then((res) => { 
//     res.data.forEach(park => {
//         const {fullName, directionsUrl} = park;
//         const {altText, url} = park.images[0];
//         console.log(fullName, directionsUrl);
//     });
// });


// Where I am trying to display data as html

// parksByState
// .then((res) => res.json())
// .then((res) => { 
//     res.data.forEach(park => {
//         const {fullName, directionsUrl} = park;
//         const {altText, url} = park.images[0];
//         const parkCard = document.createElement('div');
//         parkCard.classList.add('park');
//         parkCard.innerHTML = `
//         <div class="img-wrapper">
//             <img class="park-img" src="${url}" alt ="${altText}">
//         </div>
//        <div class="card-text">
//             <p class ="park-name">
//             ${fullName}
//             </p>
//             <a class="directions" href="${directionsUrl}"> Directions </a>
//        </div>
       
//         `
//         container.appendChild(parkCard)
//     });
// });