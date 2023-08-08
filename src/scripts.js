// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
const dayjs = require('dayjs')
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/bb-NB.png'
import './images/beyond-borders-logo-NB.png'

import { promises } from './api';
import { getTraveler, getTravelerTrips, getTotalSpentOnTrips, createSelectionDestinations, fetchData, traveler, captureFormInput, getTripTotal } from './data-model';
import { displayTrips, displayYTDSpend, displayUpcomingTrips, displayTripEstimate } from './dom-updates';

const pastTripsContainer = document.querySelector('.past-trips-container')
const pastTripsButton = document.querySelector('.past-trips-button')
const upcomingTripsButton = document.querySelector('.upcoming-trips-button')
const getEstimateButton = document.querySelector('#get-estimate-button')

const dateInput = document.querySelector('#date-Picker')
const numNightsInput = document.querySelector('#num-Nights')
const numGuestInput = document.querySelector('#num-Guests')
const destinationSelection = document.querySelector('#destination')

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

        console.log(traveler.trips[0])
        displayYTDSpend()
        createSelectionDestinations()
        // displayUpcomingTrips()
    })
})

pastTripsButton.addEventListener('click', () => {
    displayTrips()
})

upcomingTripsButton.addEventListener('click', () => {
    displayUpcomingTrips()
})

getEstimateButton.addEventListener('click', (e) => {
    e.preventDefault()

    const trip = captureFormInput(dateInput.value, numGuestInput.value, numGuestInput.value, destinationSelection.value)
    
    displayTripEstimate(trip)

})