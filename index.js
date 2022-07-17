let now = new Date();
let dayName = document.querySelector(".time");
let time = now.getHours();
let minutes = now.getMinutes();
let day = now.getDay();
let daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currenttDay = daysOfWeek[day];
dayName.innerHTML = `${currenttDay}, ${time}:${minutes}`;

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let wind = response.data.wind.speed;
  let humidity = response.data.main.humidity;
  console.log(response.data.main);

  console.log(response.data);
  let message = `☀️${temperature}℃`;
  let h1 = document.querySelector("#grad");
  let windSpeed = document.querySelector(".wind");
  let humidityNum = document.querySelector(".humidity");

  h1.innerHTML = message;
  windSpeed.innerHTML = `Wind: ${wind}km/h`;
  humidityNum.innerHTML = `Humidity: ${humidity}%`;
}

function replaceCity(event) {
  event.preventDefault();
  let cityName = document.querySelector(".city_name");
  let searchResult = document.querySelector("#site-search").value;
  searchResult.trim();
  if (searchResult !== " ") {
    cityName.innerHTML = `${searchResult}`;
  }
  let apiKey = "b9868d2aaf52986bda1ba9f29eab574a";
  let units = "metric";
  let city = searchResult;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function retrievePosition(position) {
  let apiKey = "b9868d2aaf52986bda1ba9f29eab574a";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemperature);
}

function showTemp() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let searchButton = document.querySelector("#search");
searchButton.addEventListener("click", replaceCity);
