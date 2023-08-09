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
    if (traveler.info === undefined) {
        return 'No User Found'
    } else {
        return traveler.info
    }
}

export const getTravelerTrips = () => {
    traveler.trips = fetchData.trips.filter((trip) => trip.userID === traveler.info.id)
    if (traveler.trips.length === 0) {
        return 'User has no trips'
    } else {
        return traveler.trips
    }
}

export const getDestinationDetails = (trip) => {
    let destination = fetchData.destinations.find((entry) => entry.id === trip.destinationID)
    if (destination === undefined) {
        return 'Destination Invalid'
    } else {
        return destination
    }
}

export const getTripTotal = (trip) => {
    const destinationDetails = getDestinationDetails(trip)

    if(destinationDetails === 'Destination Invalid') {
        return destinationDetails
    }

    let totalCostPerPerson = (destinationDetails.estimatedLodgingCostPerDay * trip.duration) + destinationDetails.estimatedFlightCostPerPerson
    let tripTotal = trip.travelers * totalCostPerPerson

    return (tripTotal * 1.1)
}

export const getTotalSpentOnTrips = () => {
    const totalSpentAllTime = traveler.trips.reduce((total, trip) => {
        // add filter to filter date to be within a year??//
        total += getTripTotal(trip)
        return total
        }, 0)
        return totalSpentAllTime.toFixed(2)
}

export const captureFormInput = (date, numNights, numGuests, destination) => {
    let formInputs = [date, numNights, numGuests, destination]
    let checkValue = formInputs.find(input => input === '')
    if (checkValue === '') {
         return 'Missing form inputs'
    } 
    const formattedDate = dayjs(date).format('YYYY/MM/DD')
    const tripRequest =  {
        "id": Date.now(),
        "userID": parseInt(traveler.info.id),
        "destinationID": parseInt(destination),
        "travelers": parseInt(numGuests),
        "date": formattedDate,
        "duration": parseInt(numNights),
        "status": "pending",
        "suggestedActivities": []
    }
    return tripRequest
}


