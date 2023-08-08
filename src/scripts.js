// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
const dayjs = require('dayjs')
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/bb-NB.png'
import './images/beyond-borders-logo-NB.png'

import { promises } from './api';
import { getTraveler, getTravelerTrips, getTotalSpentOnTrips, createSelectionDestinations, fetchData, traveler } from './data-model';
import { displayTrips, displayYTDSpend, displayUpcomingTrips } from './dom-updates';
const pastTripsContainer = document.querySelector('.past-trips-container')


/////////global variables////////////
// export const fetchData = {
//     // user: null,
//     travelers: [],
//     trips: [],
//     destinations: []
// }

// export let traveler = {
//     info: {},
//     trips: []
// }

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
        displayYTDSpend()
        createSelectionDestinations()
        displayUpcomingTrips()
    })
})



