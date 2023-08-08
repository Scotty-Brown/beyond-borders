
import { traveler } from "./data-model";
import { createPastTripCardElement, getTotalSpentOnTrips } from "./data-model";
//////domUpdates/////////
export const displayTrips = () => {
    const cardContainer = document.getElementById('past-trips-container')

    traveler.trips.forEach(element => {
        if (element.status === 'approved') {
        const cardElement = createPastTripCardElement(element)
        cardContainer.appendChild(cardElement)
        }
    });

}

export const displayUpcomingTrips = () => {
    const cardContainers = document.getElementById('pending-display')
    traveler.trips.forEach((element) => {
        if (element.status === 'pending') {
        const cardElements = createPastTripCardElement(element)
        cardContainers.appendChild(cardElements)
    }
    })
}

export const displayYTDSpend = () => {
    const totalDisplay = document.getElementById('ytd-spend')
    totalDisplay.innerHTML = ''
    totalDisplay.innerHTML = `YTD Spend: $${getTotalSpentOnTrips()}`
}