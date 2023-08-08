export const fetchUserTrips = (dataType) => {
    return fetch(`http://localhost:3001/api/v1/${dataType}`)
        .then(response => response.json())
}

export const postUserTrip = (trip) => {
    return fetch(`http://localhost:3001/api/v1/trips`, {
        method: 'POST',
        body: JSON.stringify(trip),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => response.json())
}

export const promises = [
    fetchUserTrips('travelers'),
    fetchUserTrips('trips'),
    fetchUserTrips('destinations')
]