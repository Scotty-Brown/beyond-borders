
import { use } from "chai";
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
    // const backToFormButton = document.createElement('button')
    // backToFormButton.textContent = 'Back To Form'
    form.id = 'hidden-form'
    estimateDisplay.classList.remove('hidden')
    estimateDisplay.innerHTML = ''
    const cardElement = createPastTripCardElement(trip)
    cardElement.classList.add('estimate-display-card')
    estimateDisplay.appendChild(cardElement)
    // estimateDisplay.appendChild(backToFormButton)
}

export const handleBackToFormClick = () => {
    const tripEstimateDisplay = document.querySelector('.trip-estimate-display')
    const bookForm = document.getElementById('hidden-form')
    const clearForm = document.querySelectorAll('.form-remove')
    const estimateCardElement = document.querySelector('.estimate-display-card')
    
    // clearForm.forEach(div => div.remove())
    tripEstimateDisplay.classList.add('hidden')
    tripEstimateDisplay.removeChild(estimateCardElement)


    bookForm.id = "booking-Form"
    // bookForm.id.remove('hidden')
}

