export const fetchUserTrips = (dataType) => {
    return fetch(`http://localhost:3001/api/v1/${dataType}`)
        .then(response => response.json())
}

export const promises = [
    fetchUserTrips('travelers'),
    fetchUserTrips('trips'),
    fetchUserTrips('destinations')
]