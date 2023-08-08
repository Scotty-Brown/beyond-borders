
import { traveler } from "./data-model";
import { createPastTripCardElement, getTotalSpentOnTrips } from "./data-model";
//////domUpdates/////////
export const displayTrips = () => {
    const cardContainer = document.getElementById('past-trips-container')
    cardContainer.innerHTML = ''
    traveler.trips.forEach(element => {
        if (element.status === 'approved') {
        const cardElement = createPastTripCardElement(element)
        cardContainer.appendChild(cardElement)
        }
    });

}

export const displayUpcomingTrips = () => {
    const cardContainer = document.getElementById('past-trips-container')
    cardContainer.innerHTML = ''
    traveler.trips.forEach((element) => {
        if (element.status === 'pending') {
        const cardElements = createPastTripCardElement(element)
        cardContainer.appendChild(cardElements)
    }
    })
}

export const displayYTDSpend = () => {
    const totalDisplay = document.getElementById('ytd-spend')
    totalDisplay.innerHTML = ''
    totalDisplay.innerHTML = `YTD Spend: $${getTotalSpentOnTrips()}`
}

export const displayTripEstimate = (trip) => {
    const estimateDisplay = document.getElementById('trip-estimate-display')
    const form = document.getElementById('booking-Form')
    form.id = 'hidden'
    estimateDisplay.classList.remove('hidden')
    const cardElement = createPastTripCardElement(trip)
    estimateDisplay.appendChild(cardElement)
}