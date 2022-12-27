let apiKey = "20tf89a5ec2abe273e4324aaode1b5bf";
let celsius = null;

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
  if (btnContent.style.display === "none") {
    btnContent.style.display = "block";
    btnDetails.innerHTML = "Show less <<<";
  } else {
    btnContent.style.display = "none";
    btnDetails.innerHTML = "Show more details >>>";
  }
}

let displayDetails = document.querySelector("#btn_details");
displayDetails.addEventListener("click", openDetails);

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
  let updateTemperatureMax = document.querySelector("#current_temperature_max");
  let currentMax = Math.round(response.data.temperature.maximum);
  updateTemperatureMax.innerHTML = currentMax;
  let updateTemperatureMin = document.querySelector("#current_temperature_min");
  let currentMin = Math.round(response.data.temperature.minimum);
  console.log(currentMin, currentMax);
  console.log(response.data);
  updateTemperatureMin.innerHTML = currentMin;
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
  celsius = response.data.temperature.current;
  //  getForecast(response.data.coordinates);
}

function searchCity(event) {
  event.preventDefault();
  let searchCityName = document.querySelector("#search_city_name");
  let city = searchCityName.value;

  if (city !== null) {
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    //axios.get(apiUrl).then(displayWeather);
    //axios.get(apiUrl).then(getForecast);
    axios.get(apiUrl).then(currentTemperature);
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
  // axios.get(apiUrl).then(displayWeather);
  axios.get(apiUrl).then(currentTemperature);
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
