import { fetchData, traveler } from "./scripts"

////////dataModel//////////
export const getTraveler = (id) => {
    traveler.info = fetchData.travelers.find((user) => user.id === id)
}

export const getTravelerTrips = () => {
    traveler.trips = fetchData.trips.filter((trip) => trip.userID === traveler.info.id)
}

export const getDestinationDetails = (trip) => {
    return fetchData.destinations.find((entry) => entry.id === trip.destinationID)
}

export const getTripTotal = (trip) => {
    const destinationDetails = getDestinationDetails(trip)
    let totalCostPerPerson = (destinationDetails.estimatedLodgingCostPerDay * trip.duration) + destinationDetails.estimatedFlightCostPerPerson
    let tripTotal = trip.travelers * totalCostPerPerson

    return (tripTotal * 1.1)
}

export const getTotalSpentOnTrips = () => {
    const totalSpentAllTime = traveler.trips.reduce((total, trip) => {
        total += getTripTotal(trip)
        return total
        }, 0)
        return totalSpentAllTime
}

export const createPastTripCardElement = (trip) => {
    const cardElement = document.createElement('article')
    const destinationDetails = getDestinationDetails(trip)
    const country = destinationDetails.destination.split(',')[1]
    const tripTotal = (getTripTotal(trip)).toLocaleString()
    const numNights = trip.duration - 1
    cardElement.innerHTML = `
        <div class="trip-card-header">
            <h4 class="trip-card-location">${destinationDetails.destination}</h4>
            <img src=${destinationDetails.image} alt=${destinationDetails.alt}>
        </div>
        <div class="trip-card-body">
        <p class="trip-details">On ${trip.date}, you spent ${trip.duration} days and ${numNights} nights with ${trip.travelers} guests in beautiful ${country}!</p>
        <p class="trip-cost">Trip Total: $${tripTotal}</p>
        </div>
    `
    return cardElement

}