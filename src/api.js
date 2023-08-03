export const fetchUserTrips = (dataType) => {
    return fetch(`http://localhost:3001/api/v1/${dataType}`)
        .then(res => res.json())
}