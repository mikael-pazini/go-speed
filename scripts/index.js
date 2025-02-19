const rdieListElement = document.querySelector("#rideList")
const allRides = getAllRides()

allRides.forEach(async ([id, value])=>{
    const ride = JSON.parse(value)
    ride.id = id

    const itemElement = document.createElement("li")
    itemElement.id = ride.id
    itemElement.className = "d-flex p-2 align-items-center justify-content-center shadow-sm gap-3"
    rdieListElement.appendChild(itemElement)

    itemElement.addEventListener("click",()=>{
        window.location.href = `./detail.html?id=${ride.id}`
    })

    const firstPosition = ride.data[0]
    const firstLocationData = await getLocationData(firstPosition.latitude, firstPosition.longitude)

    const mapId = `map${ride.id}`
    const mapElement = document.createElement("div")
    mapElement.id = mapId
    mapElement.style = "width:125px;height:125px;"
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

    itemElement.appendChild(mapElement)
    itemElement.appendChild(dataElement)

    const map = L.map(mapId,{
            attributionControl: false,
            zoomControl:false,
            dragging:false,
            scrollWheelZoom:false,
        })
    map.setView([firstPosition.latitude, firstPosition.longitude],16)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contr.'
    }).addTo(map);
    L.marker([firstPosition.latitude, firstPosition.longitude]).addTo(map)
})
