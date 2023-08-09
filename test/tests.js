import chai from 'chai';
const expect = chai.expect;

import { getTraveler, getTravelerTrips, getDestinationDetails, getTripTotal, getTotalSpentOnTrips, captureFormInput, fetchData, traveler } from '../src/data-model';
import { sampleTravelerData } from './sample-traveler-data';

describe('Traveler/Trips Repository', () => {

  beforeEach(() => {
    fetchData.travelers = sampleTravelerData.travelers
    fetchData.trips = sampleTravelerData.trips
  })

  it('Should return user info if user exists', () => {
    const traveler = getTraveler(1)
    const traveler2 = getTraveler(2)

    expect(traveler).to.be.an('object');
    expect(traveler2).to.be.an('object')
    expect(traveler.name).to.equal('Scotty Brown')
    expect(traveler2.name).to.equal('Leo Decaprio')
    expect(traveler.travelerType).to.equal('relaxer')
    expect(traveler2.travelerType).to.equal('thrill-seeker')
  });

  it('Should return error message if user does not exist', () => {

    const traveler = getTraveler(8, sampleTravelerData)
    const traveler2 = getTraveler(-1, sampleTravelerData)

    expect(traveler).to.equal('No User Found')
    expect(traveler2).to.equal('No User Found')
  })

  it('Should return all user trips', () => {
    getTraveler(1)
    const userTrip = getTravelerTrips()

    expect(userTrip).to.be.an('array')
    expect(userTrip.length).to.equal(2)
    expect(userTrip[0].duration).to.equal(8)
  })

  it('Should return error message is user has no trips', () => {
    getTraveler(2)
    const userTrip = getTravelerTrips()

    expect(userTrip).to.equal('User has no trips')
  }) 
});

describe('Destination Repository', () => {

  let sampleTripOne, sampleTripTwo, invalidTrip

  beforeEach(() => {
    fetchData.travelers = sampleTravelerData.travelers
    fetchData.trips = sampleTravelerData.trips
    fetchData.destinations = sampleTravelerData.destinations

    sampleTripOne = sampleTravelerData.trips[0]
    sampleTripTwo = sampleTravelerData.trips[1]

    invalidTrip = {
      "id": 1,
      "userID": 1,
      "destinationID": 7,
      "travelers": 1,
      "date": "2022/09/16",
      "duration": 8,
      "status": "approved",
      "suggestedActivities": []
      }
  })

  it('Should return destination details', () => {
    let destinationOne = getDestinationDetails(sampleTripOne)
    let destinationTwo = getDestinationDetails(sampleTripTwo)

    expect(destinationOne).to.be.an('object')
    expect(destinationTwo).to.be.an('object')
    expect(destinationOne.destination).to.equal('Gainesville, FL')
    expect(destinationTwo.estimatedFlightCostPerPerson).to.equal(400)
  })

  it('Should return error message if destination does not exist', () => {
    let invalidDestination = getDestinationDetails(invalidTrip)

    expect(invalidDestination).to.equal('Destination Invalid')
  })

  it('Should return total amount including agent fee for a trip', () => {
    let tripTotal = getTripTotal(sampleTripOne)

    expect(tripTotal).to.be.a('number')
    expect(tripTotal).to.equal(2189)
  })

  it('Should return error message if destination does not exist', () => {
    let invalidTripRequest = getTripTotal(invalidTrip)

    expect(invalidTripRequest).to.equal('Destination Invalid')
  })

  it('Should return amount user has spent on all trips', () => {
    getTraveler(1)
    getTravelerTrips()

    let totalSpent = getTotalSpentOnTrips()

    expect(totalSpent).to.be.a('number')
    expect(totalSpent).to.equal(11319)
  })

  it('Should return 0 if user has no prior trips', () => {
    getTraveler(2)
    getTravelerTrips()
    let totalSpent = getTotalSpentOnTrips()

    expect(totalSpent).to.equal(0)
  })
})

describe('Create element', () => {

  let inputs

  beforeEach(() => {
    getTraveler(2)
    getTravelerTrips()

    inputs = {
      date: "2023/09/16",
      numNights: 10,
      numGuests: 2,
      destination: 2
    }
    
  })
  
  it('Should return an object for fetch Post', () => {
    let formObject = captureFormInput(inputs.date, inputs.numNights, inputs.numGuests, inputs.destination)
    
    expect(formObject).to.be.an('object')
    expect(formObject.duration).to.equal(10)
    expect(formObject.date).to.equal('2023/09/16')
  })

  it('Should return error if date field is empty', () => {
    inputs.date = ''

    let formObject = captureFormInput(inputs.date, inputs.numNights, inputs.numGuests, inputs.destination)
    expect(formObject).to.be.a('string')
    expect(formObject).to.equal('Missing form inputs')
  })

  it('Should return error if number of nights is empty', () => {
    inputs.numNights = ''
    let formObject = captureFormInput(inputs.date, inputs.numNights, inputs.numGuests, inputs.destination)
    expect(formObject).to.be.a('string')
    expect(formObject).to.equal('Missing form inputs')
  })

  it('Should return error if number of guests is empty', () => {
    inputs.numGuests = ''
    let formObject = captureFormInput(inputs.date, inputs.numNights, inputs.numGuests, inputs.destination)
    expect(formObject).to.be.a('string')
    expect(formObject).to.equal('Missing form inputs')
  })

  it('Should return error if destination is empty', () => {
    inputs.destination = ''
    let formObject = captureFormInput(inputs.date, inputs.numNights, inputs.numGuests, inputs.destination)
    expect(formObject).to.be.a('string')
    expect(formObject).to.equal('Missing form inputs')
  })

})