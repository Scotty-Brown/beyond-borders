// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/bb-NB.png'
import './images/beyond-borders-logo-NB.png'

import { promises } from './api';

const pastTripsContainer = document.querySelector('.past-trips-container')


/////////global variables////////////
export const fetchData = {
    // user: null,
    travelers: [],
    trips: [],
    destinations: []
}

export let traveler = {
    info: {},
    trips: []
}

window.addEventListener('load', () => {
    Promise.all(promises)
    .then(results => {
        fetchData.travelers = results[0].travelers
        fetchData.trips = results[1].trips
        fetchData.destinations = results[2].destinations
        // console.log(fetchData)
    }).then(data => {
        getTraveler(2)
        getTravelerTrips()
    }).then(test => {
        displayTrips()
    })
})

////////dataModel//////////
const getTraveler = (id) => {
    traveler.info = fetchData.travelers.find((user) => user.id === id)
    return traveler
}

const getTravelerTrips = () => {
    traveler.trips = fetchData.trips.filter((trip) => trip.userID === traveler.info.id)
    return traveler.trips
}

// const getLastYearTotalSpent = () => {

// }

const createPastTripCardElement = (trip) => {
    const cardElement = document.createElement('article')

    cardElement.innerHTML = `
        <div class="trip-card-header">
            <h4 class="trip-card-location">Trip Name: ${trip.destinationID}</h4>
            <img src="https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80" alt="Vacation Image">
        </div>
        <div class="trip-card-body">
        <p class="trip-date">${trip.date}</p>
        <p class="trip-duration">${trip.duration}</p>
        <p class="trip-cost">COST</p>
        </div>
    `

    // let imgURL = "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80"

    // cardElement.style.backgroundImage = `url(${imgURL})`

    return cardElement

}


//////domUpdates/////////
const displayTrips = () => {
    const cardContainer = document.getElementById('past-trips-container')

    console.log(traveler.trips)

    traveler.trips.forEach(element => {
        const cardElement = createPastTripCardElement(element)
        cardContainer.appendChild(cardElement)
    });

}