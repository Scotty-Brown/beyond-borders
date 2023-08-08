// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
const dayjs = require('dayjs')
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/bb-NB.png'
import './images/beyond-borders-logo-NB.png'

import { promises, postUserTrip, fetchUserTrips } from './api';
import { getTraveler, getTravelerTrips, getTotalSpentOnTrips, createSelectionDestinations, fetchData, traveler, captureFormInput, getTripTotal, handleLogIn } from './data-model';
import { displayTrips, displayYTDSpend, displayUpcomingTrips, displayTripEstimate, handleBackToFormClick } from './dom-updates';

const pastTripsContainer = document.querySelector('.past-trips-container')
const pastTripsButton = document.querySelector('.past-trips-button')
const upcomingTripsButton = document.querySelector('.upcoming-trips-button')
const getEstimateButton = document.querySelector('#get-estimate-button')
const backToFormButton = document.querySelector('#back-to-form-button')
const bookTripButton = document.querySelector('#book-trip-button')
const bookForm = document.querySelector('#booking-form')
const logInButton = document.querySelector('#log-in-button')
const logInForm = document.querySelector('.log-In')
const dashboard = document.querySelector('.booking-display')
const YTDSpend = document.querySelector('#ytd-spend')

const dateInput = document.querySelector('#date-Picker')
const numNightsInput = document.querySelector('#num-Nights')
const numGuestInput = document.querySelector('#num-Guests')
const destinationSelection = document.querySelector('#destination')
const userName = document.querySelector('#username')
const passWord = document.querySelector('#password')


let tripCapture = {}

window.addEventListener('load', () => {
    Promise.all(promises)
    .then(results => {
        fetchData.travelers = results[0].travelers
        fetchData.trips = results[1].trips
        fetchData.destinations = results[2].destinations
    })
})

logInButton.addEventListener('click', (e) => {
    e.preventDefault()
    handleLogIn(userName.value, passWord.value)
    if (traveler.login) {
        logInForm.classList.add('hidden')
        dashboard.classList.remove('hidden')
        YTDSpend.classList.remove('hidden')
    }
})

pastTripsButton.addEventListener('click', () => {
    displayTrips()
})

upcomingTripsButton.addEventListener('click', () => {
    displayUpcomingTrips()
})

getEstimateButton.addEventListener('click', (e) => {
    e.preventDefault()

    tripCapture = captureFormInput(dateInput.value, numNightsInput.value, numGuestInput.value, destinationSelection.value)

    backToFormButton.classList.remove('hidden')
    bookTripButton.classList.remove('hidden')
    displayTripEstimate(tripCapture)

})

backToFormButton.addEventListener('click', (e) => {
    e.preventDefault()
    backToFormButton.classList.add('hidden')
    bookTripButton.classList.add('hidden')
    handleBackToFormClick()
    
})

bookTripButton.addEventListener('click', (e) => {
    e.preventDefault()
    tripCapture = captureFormInput(dateInput.value, numNightsInput.value, numGuestInput.value, destinationSelection.value)

    postUserTrip(tripCapture)
    .then(res => {
            fetchUserTrips('trips')
            .then(results => {
                console.log('results', results.trips)
                console.log('before', traveler.trips)
                fetchData.trips = results.trips
                console.log('after', traveler.trips)

            }).then(data => {
                console.log('hey')
                getTravelerTrips()
                displayUpcomingTrips()
            })
        })
        
        
})
