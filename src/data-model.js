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
        return totalSpentAllTime
}

export const captureFormInput = (date, numNights, numGuests, destination) => {
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



// export const createTripCardElement = (trip) => {
//     const destinationDetails = getDestinationDetails(trip)
//     const country = destinationDetails.destination.split(',')[1]
//     const tripTotal = (getTripTotal(trip)).toLocaleString()
//     const numNights = trip.duration - 1
//     const cardElement = document.createElement('article')
//     if (trip.status === 'approved') {
//         cardElement.classList.add('past-trips')
//         cardElement.innerHTML = `
//         <div class="trip-card-header">
//             <h2 class="trip-card-location">${destinationDetails.destination}</h2>
//             <img src=${destinationDetails.image} alt=${destinationDetails.alt}>
//         </div>
//         <div class="trip-card-body">
//             <p class="trip-details">On ${trip.date}, you spent ${trip.duration} days and ${numNights} nights with ${trip.travelers} guests in beautiful ${country}!</p>
//             <p class="trip-cost">Total: $${tripTotal}</p>
//         </div>
//     `
//     return cardElement
//     } else if (trip.status === 'pending') {
//         cardElement.classList.add('past-trips')
//         cardElement.innerHTML = `
//         <div class="trip-card-header form-remove">
//             <h2 class="trip-card-location">${destinationDetails.destination}</h2>
//             <img class="estimate-pic" src=${destinationDetails.image} alt=${destinationDetails.alt}>
//         </div>
//         <div class="trip-card-body form-remove">
//             <p class="trip-details">Trip Date: ${trip.date}</p>
//             <p class="trip-details">Duration: ${trip.duration}</p>
//             <p class="trip-details">Guests: ${trip.travelers}</p>
//             <p class="trip-details">Status: ${trip.status}</p>
//             <p class="trip-cost">Est. Trip Total: $${tripTotal}</p>
//         </div>
//         `
//         return cardElement
//     }

// }

