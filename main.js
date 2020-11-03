//List of DOM elements 
const form = document.querySelector("form");
const input = document.querySelector("input");
const place = document.querySelector("[data-location]");
const country = document.querySelector("[data-country]");
const temperature = document.querySelector("[data-temperature]");
const wind = document.querySelector("[data-wind]");
const humidity = document.querySelector("[data-humidity]");
const icon = document.querySelector("[data-icon]");
const dayDisplay = document.querySelector("[data-day]");

// API KEY & URL
const api = {
  key: "4c675429d7a0a50a0c8a264ad1b168b6",
  baseUrl: "https://api.openweathermap.org/data/2.5/weather?q=",
};
const imageUrl = "https://openweathermap.org/img/wn/";


//Forms have a submit event, we would listen for that submit event and first of all disable the default submit event. 
//Then we get the value of the input field and call it searchTerm, 
//then we pass that into a function that we will use to query the api for the weather
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = input.value;
  getWeather(searchTerm);
});

//Function to fetch the weather detail. Using the async function.
async function getWeather(searchTerm) {
  try {
    const searchUrl = `${api.baseUrl}${searchTerm}&units=metric&appid=${api.key}`;
    const response = await fetch(searchUrl);
    const data = await response.json();
    console.log(data);
    displayWeather(data);
  } catch (error) {
    console.log(error);
  }
}

//This function displays the weather detail.
function displayWeather(obj) {
  place.textContent = obj.name;
  country.textContent = obj.sys.country;
  temperature.textContent = obj.main.temp;
  wind.textContent = obj.wind.speed;
  humidity.textContent = obj.main.humidity;
  icon.src = `${imageUrl}${obj.weather[0].icon}@2x.png`;
  displayDay();
}

//This function helps display the current date
function displayDay() {
  let now = new Date();
  const months = [
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
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = days[now.getDay()];
  const date = now.getDate();
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  dayDisplay.textContent = `${day} ${date} ${month} ${year}`;
}
