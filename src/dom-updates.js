
import { use } from "chai";
import { fetchData, traveler } from "./data-model";
import { getTotalSpentOnTrips, getTraveler, getTravelerTrips, getDestinationDetails, getTripTotal } from "./data-model";

const dayjs = require('dayjs')

//////domUpdates/////////
export const displayTrips = () => {
    const cardContainer = document.getElementById('past-trips-container')
    cardContainer.innerHTML = ''
    traveler.trips.forEach(element => {
        if (element.status === 'approved') {
        const cardElement = createTripCardElement(element)
        cardContainer.appendChild(cardElement)
        }
    });

}

export const displayUpcomingTrips = () => {
    const cardContainer = document.getElementById('past-trips-container')
    cardContainer.innerHTML = ''
    const today = dayjs()
    const formattedToday = today.format('YYYY/MM/DD')

    traveler.trips.forEach((element) => {
        const tripDate = dayjs(element.date)
        const todaysDate = dayjs(formattedToday)
        if (element.status === 'pending' && todaysDate.isBefore(tripDate)) {
        const cardElements = createTripCardElement(element)
        cardContainer.appendChild(cardElements)
    }
    })
}

export const displayYTDSpend = () => {
    const totalDisplay = document.getElementById('ytd-spend')
    totalDisplay.innerHTML = ''
    totalDisplay.innerHTML = `-Welcome- <br> ${traveler.info.name}! <br> <br> -YTD Spend- <br> $${getTotalSpentOnTrips()}`
}

export const displayTripEstimate = (trip) => {
    const estimateDisplay = document.getElementById('trip-estimate-display')
    const form = document.getElementById('bookingForm')
    form.id = 'hidden-form'
    estimateDisplay.classList.remove('hidden')
    estimateDisplay.innerHTML = ''
    const cardElement = createTripCardElement(trip)
    cardElement.classList.add('estimate-display-card')
    estimateDisplay.appendChild(cardElement)
}

export const createSelectionDestinations = () => {
    const dropDown = document.getElementById('destination')
    return fetchData.destinations.forEach((element) => {
        const option = document.createElement('option')
        option.value = element.id
        option.text = element.destination
        dropDown.appendChild(option)
    })
}

export const handleLogIn = (userName, passWord) => {
    const prefix = 'traveler'
    const numValue = userName.substring(prefix.length)
    const userNum = parseInt(numValue)
    if (passWord != 'travel') {
        return 'Incorrect Password'
    } else if (userName.startsWith(prefix) && userNum < 51) {
        getTraveler(userNum, fetchData)
        getTravelerTrips()
        displayYTDSpend()
        createSelectionDestinations()
        traveler.login = true
    }
}
export const handleBackToFormClick = () => {
    const tripEstimateDisplay = document.querySelector('.trip-estimate-display')
    const bookForm = document.getElementById('hidden-form')
    const estimateCardElement = document.querySelector('.estimate-display-card')
    tripEstimateDisplay.classList.add('hidden')
    tripEstimateDisplay.removeChild(estimateCardElement)
    bookForm.id = "bookingForm"
}

export const createTripCardElement = (trip) => {
    const destinationDetails = getDestinationDetails(trip)
    const country = destinationDetails.destination.split(',')[1]
    const tripTotal = (getTripTotal(trip)).toLocaleString()
    const numNights = trip.duration - 1
    const cardElement = document.createElement('article')
    if (trip.status === 'approved') {
        cardElement.classList.add('past-trips')
        cardElement.innerHTML = `
        <div class="trip-card-header">
            <h2 class="trip-card-location">${destinationDetails.destination}</h2>
            <img src=${destinationDetails.image} alt=${destinationDetails.alt}>
        </div>
        <div class="trip-card-body">
            <p class="trip-details">On ${trip.date}, you spent ${trip.duration} days and ${numNights} nights with ${trip.travelers} guests in beautiful ${country}!</p>
            <p class="trip-cost">Total: $${tripTotal}</p>
        </div>
    `
    return cardElement
    } else if (trip.status === 'pending') {
        cardElement.classList.add('past-trips')
        cardElement.innerHTML = `
        <div class="trip-card-header form-remove">
            <h2 class="trip-card-location">${destinationDetails.destination}</h2>
            <img class="estimate-pic" src=${destinationDetails.image} alt=${destinationDetails.alt}>
        </div>
        <div class="trip-card-body form-remove">
            <p class="trip-details">Trip Date: ${trip.date}</p>
            <p class="trip-details">Duration: ${trip.duration}</p>
            <p class="trip-details">Guests: ${trip.travelers}</p>
            <p class="trip-details">Status: ${trip.status}</p>
            <p class="trip-cost">Est. Trip Total: $${tripTotal}</p>
        </div>
        `
        return cardElement
    }

}

export const setDatePicker = (element) => {
    const today = dayjs()
    const formattedDay = today.format('YYYY-MM-DD')
    element.setAttribute('min', formattedDay)
}

// export const clearForm = () => {
//     dateInput.value = '' 
//     numNightsInput.value = ''
//     numGuestInput.value = ''
//     destinationSelection.value = ''
// }

