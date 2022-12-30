let apiKey = "20tf89a5ec2abe273e4324aaode1b5bf";

function displayWeather() {
  document.getElementById("tab_content").style.display = "block";
}

function openForecast(evt, forecast) {
  let i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace("active", "");
  }
  document.getElementById(forecast).style.display = "block";
  evt.currentTarget.className += "active";
}

document.getElementById("defaultOpen").click();

function openDetails() {
  let btnDetails = document.getElementById("btn_details");
  let btnContent = document.getElementById("btn_content");
  if (btnContent.style.display === "block") {
    btnContent.style.display = "none";
    btnDetails.innerHTML = "Show more details >>>";
  } else {
    btnContent.style.display = "block";
    btnDetails.innerHTML = "Show less <<<";
  }
}

let displayDetails = document.querySelector("#btn_details");
displayDetails.addEventListener("click", openDetails);

function formatDayForecast(timestamp) {
  let currentDate = new Date(timestamp * 1000);
  let day = currentDate.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  return days[day];
}

function displayForecastThree(response) {
  let forecast = response.data.daily;
  let forecastElementThree = document.querySelector("#forecast_3");
  let forecastHTML = `<div class="row justify-content-sm-around">`;
  forecast.forEach(function(forecastDay, index) {
    if (index >= 0 && index < 3) {
      forecastHTML =
        forecastHTML +
        ` <div class="col col-sm-3 border border-primary rounded m-sm-2 shadow p-3 mb-5 bg-body-tertiary">
            <div  id="forecast_day"> <strong>${formatDayForecast(
              forecastDay.time
            )}</strong></div>
      <div  id="forecast_icon">
        <img
          src=${forecastDay.condition.icon_url}
          id="weather_forecast_icon"
        />
      </div>
      <div class="forecast_temperature">
        <span  id="forecast_temperature_max">${Math.round(
          forecastDay.temperature.maximum
        )}</span>...
        <span  id="forecast_temperature_min">${Math.round(
          forecastDay.temperature.minimum
        )}</span>
      </div>
            </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElementThree.innerHTML = forecastHTML;
}

function displayForecastSix(response) {
  let forecast = response.data.daily;
  let forecastElementSix = document.querySelector("#forecast_6");
  let forecastHTML = `<div class="row justify-content-sm-around">`;
  forecast.forEach(function(forecastDay, index) {
    if (index > 0 && index < 7) {
      forecastHTML =
        forecastHTML +
        ` <div class="col-sm-3 border border-primary rounded  m-sm-2 shadow p-3 mb-5 bg-body-tertiary">
      <div id="forecast_day"> <strong> ${formatDayForecast(
        forecastDay.time
      )}</strong></div>
      <div id="forecast_icon">
        <img
          src=${forecastDay.condition.icon_url}
          id="weather_forecast_icon"
        />
      </div>
      <div class="forecast_temperature">
        <span id="forecast_temperature_max">${Math.round(
          forecastDay.temperature.maximum
        )}</span>...
        <span id="forecast_temperature_min">${Math.round(
          forecastDay.temperature.minimum
        )}</span>
      </div>
      </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElementSix.innerHTML = forecastHTML;
}

function addCurrentDetails(response) {
  let currentMax = Math.round(response.data.daily[0].temperature.maximum);
  let updateMax = document.querySelector("#current_temperature_max");
  updateMax.innerHTML = currentMax;
  let currentMin = Math.round(response.data.daily[0].temperature.minimum);
  let updateMin = document.querySelector("#current_temperature_min");
  updateMin.innerHTML = currentMin;
}

function getForecast(coordinates) {
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}`;
  axios.get(apiUrl).then(displayForecastThree);
  axios.get(apiUrl).then(displayForecastSix);
  axios.get(apiUrl).then(addCurrentDetails);
}

function changeBackground(response) {
  let weatherInfo = response.data.condition.description;
  let checkTemperature = Math.round(response.data.temperature.current);
  if (weatherInfo.match(/snow/) && checkTemperature > -2) {
    let oldImage = document.getElementById("background_img");
    oldImage.src = "./images/snow1.jpg";
  } else if (weatherInfo.match(/snow/) && checkTemperature < -2) {
    let oldImage = document.getElementById("background_img");
    oldImage.src = "./images/snow.jpg";
  } else if (weatherInfo.match(/rain/) && checkTemperature > -2) {
    let oldImage = document.getElementById("background_img");
    oldImage.src = "./images/rain1.jpg";
  } else if (weatherInfo.match(/rain/) && checkTemperature < -2) {
    let oldImage = document.getElementById("background_img");
    oldImage.src = "./images/rain.jpg";
  } else if (weatherInfo.match(/sky/) && checkTemperature > -2) {
    let oldImage = document.getElementById("background_img");
    oldImage.src = "./images/sky1.jpg";
  } else if (weatherInfo.match(/sky/) && checkTemperature < -2) {
    let oldImage = document.getElementById("background_img");
    oldImage.src = "./images/sky.jpg";
  } else if (weatherInfo.match(/clouds/) && checkTemperature > -2) {
    let oldImage = document.getElementById("background_img");
    oldImage.src = "./images/clouds1.jpg";
  } else if (weatherInfo.match(/clouds/) && checkTemperature < -2) {
    let oldImage = document.getElementById("background_img");
    oldImage.src = "./images/clouds.jpg";
  } else {
    let oldImage = document.getElementById("background_img");
    oldImage.src = "./images/background.jpg";
  }
}

function currentTemperature(response) {
  let newCityName = response.data.city;
  let CountryName = response.data.country;
  let newCity = document.querySelector("h1");
  newCity.innerHTML = `${newCityName}, ${CountryName}`;
  let currentTemperatureIs = Math.round(response.data.temperature.current);
  let updateTemperature = document.querySelector(
    "#current_weather_temperature"
  );
  updateTemperature.innerHTML = currentTemperatureIs;
  let currentHumidity = response.data.temperature.humidity;
  let updateHumidity = document.querySelector("#current_humidity");
  updateHumidity.innerHTML = currentHumidity;
  let currentWind = Math.round(response.data.wind.speed);
  let updateWind = document.querySelector("#current_wind");
  updateWind.innerHTML = currentWind;
  let currentWeather = response.data.condition.description;
  let updateWeather = document.querySelector("#current_weather_description");
  updateWeather.innerHTML = currentWeather;
  let newIcon = document.querySelector("#current_weather_image");
  newIcon.src = response.data.condition.icon_url;
  getForecast(response.data.coordinates);
}

function searchCity(event) {
  event.preventDefault();
  let searchCityName = document.querySelector("#search_city_name");
  let city = searchCityName.value;

  if (city !== null) {
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
    axios.get(apiUrl).then(getForecast);
    axios.get(apiUrl).then(currentTemperature);
    axios.get(apiUrl).then(changeBackground);
  } else {
    currentCityWeather();
  }
}

let searchForm = document.querySelector("#search_form");
searchForm.addEventListener("submit", searchCity);

function currentCityWeather(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
  axios.get(apiUrl).then(currentTemperature);
  axios.get(apiUrl).then(changeBackground);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(currentCityWeather);
}

let locationButton = document.querySelector(".dropdown_content");
locationButton.addEventListener("click", getCurrentPosition);

function formatDate(date) {
  let daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  let currentDate = new Date();
  let currentDayofWeek = daysOfWeek[currentDate.getDay()];
  let currentMonth = monthsOfYear[currentDate.getMonth()];
  let currentDay = currentDate.getDate();

  let request = `${currentDayofWeek}, ${currentMonth} ${currentDay} `;

  return request;
}

function formatTime() {
  let currentTime = new Date();
  let hour = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hour} : ${minutes}`;
}

current_date.innerHTML = formatDate();
current_time.innerHTML = formatTime();
