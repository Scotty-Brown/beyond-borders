import { displayYTDSpend } from './dom-updates'

const dayjs = require('dayjs')

export const fetchData = {
    // user: null,
    travelers: [],
    trips: [],
    destinations: []
}

export let traveler = {
    info: {},
    trips: [],
    login: false
}


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

export const captureFormInput = (date, numNights, NumGuests, destination) => {
    const formattedDate = dayjs(date).format('YYYY/MM/DD')
    const tripRequest =  {
        "id": Date.now(),
        "userID": parseInt(traveler.info.id),
        "destinationID": parseInt(destination),
        "travelers": parseInt(NumGuests),
        "date": formattedDate,
        "duration": parseInt(numNights),
        "status": "pending",
        "suggestedActivities": []
    }
    return tripRequest
}

export const getTotalSpentOnTrips = () => {
    const totalSpentAllTime = traveler.trips.reduce((total, trip) => {
        total += getTripTotal(trip)
        return total
        }, 0)
        return totalSpentAllTime
}

export const createPastTripCardElement = (trip) => {
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
    if (passWord != 'travel') {
        return console.log('Incorrect Password')
    } else if (userName.startsWith(prefix)) {
        const numValue = userName.substring(prefix.length)
        const userNum = parseInt(numValue)
        getTraveler(userNum)
        getTravelerTrips()
        displayYTDSpend()
        createSelectionDestinations()
        traveler.login = true
    }
}


