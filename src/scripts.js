const dayjs = require('dayjs')

import './css/styles.css';
import './images/bb-NB.png'

import { promises, postUserTrip, fetchUserTrips } from './api';
import { getTraveler, getTravelerTrips, getTotalSpentOnTrips,  fetchData, traveler, captureFormInput, getTripTotal } from './data-model';
import { displayTrips, displayYTDSpend, displayUpcomingTrips, displayTripEstimate, handleBackToFormClick, handleLogIn, createSelectionDestinations, setDatePicker } from './dom-updates';

const pastTripsContainer = document.querySelector('.past-trips-container')
const pastTripsButton = document.querySelector('.past-trips-button')
const upcomingTripsButton = document.querySelector('.upcoming-trips-button')
const getEstimateButton = document.querySelector('#get-estimate-button')
const backToFormButton = document.querySelector('#back-to-form-button')
const bookTripButton = document.querySelector('#book-trip-button')
const bookForm = document.querySelector('#booking-form')
const logInButton = document.querySelector('#log-in-button')
const logInForm = document.querySelector('.log-in')
const dashboard = document.querySelector('.booking-display')
const YTDSpend = document.querySelector('#ytd-spend')
const datePicker = document.getElementById('datePicker')
const logInErrorMessage = document.querySelector('.log-in-error')

const dateInput = document.querySelector('#datePicker')
const numNightsInput = document.querySelector('#numNights')
const numGuestInput = document.querySelector('#numGuests')
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
    }).catch(error => console.log('ERROR', error))
})

logInButton.addEventListener('click', (e) => {
    e.preventDefault()
    handleLogIn(userName.value, passWord.value)
    if (traveler.login) {
        logInForm.classList.add('hidden')
        dashboard.classList.remove('hidden')
        YTDSpend.classList.remove('hidden')
        setDatePicker(datePicker)
    } else {
        logInErrorMessage.classList.remove('hidden')
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
    if (tripCapture === 'Missing form inputs') {
        return
    } else {
    backToFormButton.classList.remove('hidden')
    bookTripButton.classList.remove('hidden')
    displayTripEstimate(tripCapture)
}
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
                fetchData.trips = results.trips
            }).then(data => {
                getTravelerTrips()
                displayUpcomingTrips()
            })
        })
    backToFormButton.classList.add('hidden')
    bookTripButton.classList.add('hidden')
     handleBackToFormClick()   
})
