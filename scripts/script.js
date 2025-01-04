const speedElement = document.querySelector("#speed")
const startBtn = document.querySelector("#start")
const stopBtn = document.querySelector("#stop")

startBtn.addEventListener("click",()=>{

    function handleSuccess(position){
        speedElement.innerText = position.coords.speed
    }
    function handleError(error){
        console.log(error.msg)
    }
    const options = {enableHighAccuracy:true}

    navigator.geolocation.watchPosition(handleSuccess, handleError, options)

    startBtn.classList.add("d-none")
    stopBtn.classList.remove("d-none")
})

stopBtn.addEventListener("click",()=>{
    startBtn.classList.remove("d-none")
    stopBtn.classList.add("d-none")
})

