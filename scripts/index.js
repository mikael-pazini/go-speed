const rdieListElement = document.querySelector("#rideList")
const allRides = getAllRides()

allRides.forEach(async ([id, value])=>{
    const ride = JSON.parse(value)
    ride.id = id

    const firstPosition = ride.data[0]
    const firstLocationData = await getLocationData(firstPosition.latitude, firstPosition.longitude)

    const itemElement = document.createElement("li")
    itemElement.id = ride.id
    itemElement.className = "d-flex p-1 align-itens-center justify-content- shadow-sm gap-3"

    const mapElement = document.createElement("div")
    mapElement.style = "width:100px;height:100px;"
    mapElement.classList.add("bg-secondary")
    mapElement.classList.add("rounded-4")

    const dataElement = document.createElement("div")
    dataElement.className = "flex-fill d-flex flex-column"

    const cityDiv = document.createElement("div")
    cityDiv.innerText = `${firstLocationData.city} - ${firstLocationData.countryCode}`
    cityDiv.className = "text-primary mb-2"

    const maxSpeedDiv = document.createElement("div")
    maxSpeedDiv.innerText = `Max speed: ${getMaxSpeed(ride.data)} Km/h`

    const distanceDiv = document.createElement("div")
    distanceDiv.innerText = `Distance: ${getDistance(ride.data)} Km`
    
    const durationRideDiv = document.createElement("div")
    durationRideDiv.innerText = getDurationRide(ride)

    const dateDiv = document.createElement("div")
    dateDiv.innerText = getStartDate(ride)

    dataElement.appendChild(cityDiv)
    dataElement.appendChild(maxSpeedDiv)
    dataElement.appendChild(distanceDiv)
    dataElement.appendChild(durationRideDiv)
    dataElement.appendChild(dateDiv)

    itemElement.appendChild(mapElement)
    itemElement.appendChild(dataElement)

    rdieListElement.appendChild(itemElement)
})

async function getLocationData(latitude, longitude){
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&=localityLanguage=en`

    const response = await fetch(url)
    return await response.json()
}

function getMaxSpeed(positions){
    let maxSpeed = 0
    positions.forEach(position=>{
        if(position.speed != null && position.speed > maxSpeed)
            maxSpeed = position.speed
    })
    return (maxSpeed * 3.6).toFixed(1)
}

function getDistance(positions){
    const earthRadius = 6371
    let totalDistance = 0
    for(let i = 0; i < positions.length - 1; i++){
        const position1 = {latitude:positions[i].latitude, longitude:positions[i].longitude}
        const position2 = {latitude:positions[i+1].latitude, longitude:positions[i+1].longitude}

        const deltaLatitude = toRad(position2.latitude - position1.latitude)
        const deltaLongitude = toRad(position2.longitude - position1.longitude)

        const a = Math.sin(deltaLatitude/2) * Math.sin(deltaLatitude/2) + 
        Math.sin(deltaLongitude/2) * Math.sin(deltaLongitude/2) * 
        Math.cos(toRad(position1.latitude)) * Math.cos(toRad(position2.latitude))

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))

        const distance = earthRadius * c

        totalDistance += distance
    }

    function toRad(degree){
        return degree * Math.PI /180
    }

    return totalDistance.toFixed(2)

}

function getDurationRide(ride){

    function format(number, digits){
        return String(number.toFixed(0)).padStart(2, '0')
    }

    const interval = (ride.stopTime - ride.startTime)/1000

    const minutes = Math.trunc(interval / 60)
    const seconds = interval % 60

    return `${format(minutes,2)}:${format(seconds,2)}`
}

function getStartDate(ride){
    const date = new Date(ride.startTime)

    const day = date.toLocaleString("pt-BR", {day:"numeric"})
    const month = date.toLocaleString("pt-BR", {month:"short"})
    const year = date.toLocaleString("pt-BR", {year:"numeric"})
    const hour = date.toLocaleString("pt-BR", {hour:"2-digit"})
    const minute = date.toLocaleString("pt-BR", {minute:"2-digit"})

    return `${day}/${month}/${year} - ${hour}:${minute}`
}