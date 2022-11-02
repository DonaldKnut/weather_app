const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");
const forecast = new Forecast();

// import { Forecast } from "./forecast";


const updateUI = (data) => {
    
        console.log(data);
        const {cityDetails, weather} = data;
        details.innerHTML = `
        <div>
                <h5 class="city-name">${cityDetails.EnglishName}</h5>
                <div class="weather-condition">${weather.WeatherText}</div>
                <div class="display">
                    <span>${weather.Temperature.Metric.Value}</span>
                    <span>&deg;C</span>
                </div>
        </div>
        `;
        //update the night and day icons
        const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
        icon.setAttribute("src", iconSrc);


        let timeSrc = null;
        if(weather.IsDayTime){
                timeSrc = "img/day.svg";
        } else {
            timeSrc = "img/night.svg";
        }
        time.setAttribute("src", timeSrc);

        //update user interface
        if(card.classList.contains("d-none")){
                card.classList.remove("d-none");
        }
}




cityForm.addEventListener("submit", e => {
    // prevent default action
    e.preventDefault();

    //get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update ui
    forecast.updateCity(city).then(data => {
        updateUI(data);
    }).catch(err => console.log(err));

    //set local storage
    localStorage.setItem("city", city);
})

if(localStorage.getItem("city")){
        forecast.updateCity(localStorage.getItem("city"))
        .then(data => {updateUI(data)})
        .catch(err => console.log(err));
}