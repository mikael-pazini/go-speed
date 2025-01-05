const params = new URLSearchParams(window.location.search)
const rideId = params.get("id")
const ride = getRideRecord(rideId)

document.addEventListener("DOMContentLoaded",async()=>{

const firstPosition = ride.data[0]
const firstLocationData = await getLocationData(firstPosition.latitude, firstPosition.longitude)

const mapElement = document.createElement("div")
mapElement.style = "width:100px;height:100px;"
mapElement.classList.add("bg-secondary")
mapElement.classList.add("rounded-4")

const dataElement = document.createElement("div")
dataElement.className = "flex-fill d-flex flex-column"

const cityDiv = document.createElement("div")
cityDiv.innerText = `${firstLocationData.city} - ${firstLocationData.countryCode}`
cityDiv.className = "text-primary mb-2 display-6"

const maxSpeedDiv = document.createElement("div")
maxSpeedDiv.innerText = `Max speed: ${getMaxSpeed(ride.data)} Km/h`
maxSpeedDiv.className = "h5 text-light"

const distanceDiv = document.createElement("div")
distanceDiv.innerText = `Distance: ${getDistance(ride.data)} Km`
distanceDiv.className = "text-light"

const durationRideDiv = document.createElement("div")
durationRideDiv.innerText = `Duration: ${getDurationRide(ride)} min`
durationRideDiv.className = "text-light"

const dateDiv = document.createElement("div")
dateDiv.innerText = getStartDate(ride)
dateDiv.className = "text-secondary mt-2"

dataElement.appendChild(cityDiv)
dataElement.appendChild(maxSpeedDiv)
dataElement.appendChild(distanceDiv)
dataElement.appendChild(durationRideDiv)
dataElement.appendChild(dateDiv)

document.querySelector("#data").appendChild(dataElement)
})