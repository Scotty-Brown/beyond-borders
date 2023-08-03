// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/beyond-borders-logo.png'
import './images/beyond-borders-logo-NB.png'

import { fetchUserTrips } from './api';

export const dataModel = {
    trips: []
}

window.addEventListener('load', () => {
    fetchUserTrips('destinations')
    .then(results => dataModel.trips.push(results))
    .then(res => console.log(dataModel))
    .catch(error => console.log('ERROR', error))
})