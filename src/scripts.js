// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/bb-NB.png'
import './images/beyond-borders-logo-NB.png'

import { promises } from './api';

export const fetchData = {
    // user: null,
    travelers: '',
    trips: '',
    destinations: ''
}

window.addEventListener('load', () => {
    Promise.all(promises)
    .then(results => {
        fetchData.travelers = (results[0])
        fetchData.trips = (results[1])
        fetchData.destinations = (results[2])
        console.log(fetchData)
    })
})