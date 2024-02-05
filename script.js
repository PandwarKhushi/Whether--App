const inputBox = document.querySelector(".input-box");
const searchBtn = document.getElementById("searchBtn");
const weather_img = document.querySelector(".weather-img");
// const weather_vedio = document.querySelector(".weather-vedio");
const temprature = document.querySelector(".temprature");
const description = document.querySelector(".description");
const humidity = document.querySelector(".humidity-stats");
const wind_speed = document.querySelector("#wind-speed");
const location_not_found = document.querySelector(".location-not-found");
const weather_body = document.querySelector(".weather-body");
const background_video = document.querySelector(".background-video");

async function checkWeather(city) {
  const api_key = "2c4a229ec1962fd500b7c403389e38ea";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

  const weather_data = await fetch(`${url}`).then((response) =>
    response.json()
  );

  if (weather_data.cod === `404`) {
    location_not_found.style.display = "flex";
    weather_body.style.display = "none";
    background_video.src = "/Assets/404 (720p).mp4";
    console.log("error");
    return;
  }
  location_not_found.style.display = "none";
  weather_body.style.display = "flex";
  temprature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
  description.innerHTML = `${weather_data.weather[0].description}`;
  humidity.innerHTML = `${weather_data.main.humidity}%`;
  wind_speed.innerHTML = `${weather_data.wind.speed}Km/h`;

  switch (weather_data.weather[0].main) {
    case "Clouds":
      weather_img.src = "/Assets/cloud.png";
      background_video.src = "/Assets/clouds_720p.mp4";
      break;
    case "Clear":
    case "Haze":
      weather_img.src = "/Assets/clear.png";
      background_video.src = "/Assets/sunny_1440p.mp4";
      break;
    case "Rain":
      weather_img.src = "/Assets/rain.png";
      background_video.src = "/Assets/rain_720p.mp4";
      break;
    case "Fog":
    case "Smoke":
    case "Mist":
      weather_img.src = "/Assets/mist.png";
      background_video.src = "/Assets/mist_1440p.mp4";
      break;
    case "Snow":
      weather_img.src = "/Assets/snow 1.webp";
      background_video.src = "/Assets/snowfall_1440p.mp4";
      break;
  }
  console.log(weather_data);
}

function handleEnterKey(event) {
  if (event.key === "Enter") {
    checkWeather(inputBox.value);
  }
}
searchBtn.addEventListener("click", () => {
  checkWeather(inputBox.value);
});

inputBox.addEventListener("keyup", handleEnterKey);
