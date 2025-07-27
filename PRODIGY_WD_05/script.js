const apiKey = "5abc8ee8709043e8947173437252307"; // Your WeatherAPI key

function updateDateTime() {
  const now = new Date();
  const day = now.toLocaleDateString(undefined, { weekday: "long" });
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();
  document.getElementById("datetime").innerText = `${day}, ${date} ${time}`;
}

setInterval(updateDateTime, 1000);
updateDateTime();

function getWeatherByCity() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    alert("Please enter a city name.");
    return;
  }
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;
  fetchWeather(url);
}

function fetchWeather(url) {
  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then(data => showWeather(data))
    .catch(error => alert(error.message));
}

function showWeather(data) {
  document.getElementById("weatherCard").classList.remove("hidden");
  document.getElementById("location").innerText = `${data.location.name}, ${data.location.country}`;
  document.getElementById("description").innerText = data.current.condition.text;
  document.getElementById("temp").innerText = data.current.temp_c;
  document.getElementById("humidity").innerText = data.current.humidity;
  document.getElementById("wind").innerText = data.current.wind_kph;
  document.getElementById("weatherIcon").src = "https:" + data.current.condition.icon;
}

// Auto fetch using geolocation
window.onload = function () {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=yes`;
      fetchWeather(url);
    });
  }
};
