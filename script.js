const inputBox = document.querySelector(".input-box");
const searchbutton = document.getElementById("searchBtn");
const weather_img = document.querySelector(".weather-img");
const temprature = document.querySelector(".temprature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const wind_speed = document.getElementById("wind-speed");
const location_not_fount = document.querySelector(".location-not-found");
const weather_body = document.querySelector(".weather-body");


async function checkWeather(city){
    const api_key = "70a2b480e67c29fb6b10849929e33ae7"
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`

    const Weather_data = await fetch(URL).then((response)=>{
        return response.json();
    })

    if(Weather_data.cod === '404'){
        location_not_fount.style.display = 'flex';
        weather_body.style.display = 'none';
        return;
    }
    
    location_not_fount.style.display = 'none';
    weather_body.style.display = 'flex';

    temprature.innerHTML = `${Math.round(Weather_data.main.temp - 273.15)}°C`
    description.innerHTML = `${Weather_data.weather[0].description}`;
    humidity.innerHTML = `${Weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${Weather_data.wind.speed}Km/h`;

    switch(Weather_data.weather[0].main){
        case 'Clouds' : 
            weather_img.src = "./photos/cloud.png";
            break;
        case 'Clear' :
            weather_img.src = "./photos/clear.png";
            break;
        case 'Rain' :
            weather_img.src = "./photos/rain.png";
            break;
        case 'Mist' : 
            weather_img.src = "./photos/mist.png";
            break;
        case 'Snow' :
            weather_img.src = "./photos/snow.png"
    }

    // console.log(Weather_data)

}

searchbutton.addEventListener("click",(e)=>{
    checkWeather(inputBox.value);
});


