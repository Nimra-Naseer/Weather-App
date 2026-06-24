async function getWeather(event) {
  event.preventDefault();

  // Audio play
  const audio = document.getElementById("sparrow-chirping");

  if (audio) {
    audio.play().catch((error) => {
      console.log("Audio blocked:", error);
    });
  }

  // City Input
  const city = document.getElementById("city-input").value.trim();

  // Empty input check
  if (city === "") {
    alert("Please enter a city name");
    return;
  }

  try {

    // API Request
    const response = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=25175e31b7074cfc895204529222906&q=${city}`
    );

    // Data
    const data = response.data;

    const temperature = data.current.temp_c;
    const feelsLike = data.current.feelslike_c;
    const weatherTerm = data.current.condition.text;
    const humidity = data.current.humidity;
    const windSpeed = data.current.wind_kph;
    const icon = data.current.condition.icon;
    const precipitation = data.current.precip_mm;

    // Update UI
    document.getElementById(
      "temp-result"
    ).innerHTML = `${temperature}°C`;

    document.getElementById(
      "fl-result"
    ).innerHTML = `Feels like ${feelsLike}°C`;

    document.getElementById(
      "weather-term"
    ).innerHTML = weatherTerm;

    document.getElementById(
      "humidity-result"
    ).innerHTML = `Humidity: ${humidity}%`;

    document.getElementById(
      "wind-result"
    ).innerHTML = `Wind Speed: ${windSpeed} kph`;

    document.getElementById(
      "precipitation-percentage"
    ).innerHTML = `Precipitation: ${precipitation} mm`;

    // Weather Icon
    const weatherIcon = document.getElementById("weather-icon");

    weatherIcon.src = `https:${icon}`;
    weatherIcon.style.display = "inline-block";

  } catch (error) {

    console.log(error);

    alert("City not found!");

    // Clear old data
    document.getElementById("temp-result").innerHTML = "";
    document.getElementById("fl-result").innerHTML = "";
    document.getElementById("weather-term").innerHTML = "";
    document.getElementById("humidity-result").innerHTML = "";
    document.getElementById("wind-result").innerHTML = "";
    document.getElementById("precipitation-percentage").innerHTML = "";

    document.getElementById("weather-icon").style.display = "none";
  }
}