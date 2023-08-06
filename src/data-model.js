import { fetchData, traveler } from "./scripts"

////////dataModel//////////
export const getTraveler = (id) => {
    traveler.info = fetchData.travelers.find((user) => user.id === id)
    // return traveler
}

export const getTravelerTrips = () => {
    traveler.trips = fetchData.trips.filter((trip) => trip.userID === traveler.info.id)
    // return traveler.trips
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
        // console.log('triptotal', getTripTotal(trip))
        total += getTripTotal(trip)
        return total
        }, 0)
        // console.log(totalSpentAllTime)

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
            <h4 class="trip-card-location">Trip Name: ${destinationDetails.destination}</h4>
            <img src=${destinationDetails.image} alt=${destinationDetails.alt}>
        </div>
        <div class="trip-card-body">
        <p class="trip-details">On ${trip.date}, you spent ${trip.duration} days and ${numNights} nights with ${trip.travelers} guests in beautiful ${country}!</p>
        <p class="trip-cost">Trip Total: $${tripTotal}</p>
        </div>
    `

    // add status of trip to innerhtml

    // let imgURL = "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80"

    // cardElement.style.backgroundImage = `url(${imgURL})`

    return cardElement

}