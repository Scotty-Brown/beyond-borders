
import { traveler } from "./scripts";
import { createPastTripCardElement, getTotalSpentOnTrips } from "./data-model";
//////domUpdates/////////
export const displayTrips = () => {
    const cardContainer = document.getElementById('past-trips-container')

    traveler.trips.forEach(element => {
        const cardElement = createPastTripCardElement(element)
        cardContainer.appendChild(cardElement)
    });

}

export const displayYTDSpend = () => {
    const totalDisplay = document.getElementById('ytd-spend')
    totalDisplay.innerHTML = ''
    totalDisplay.innerHTML = `YTD Spend: $${getTotalSpentOnTrips()}`
}