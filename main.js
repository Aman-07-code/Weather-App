// OpenWeatherMap API configuration
const apiKey = "257f47df6cfc2f8124264217e39397b8";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Selecting DOM elements
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// Fetch and display weather data
async function checkWeather(city) {
    try {
        // Fetch weather data from OpenWeatherMap API
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);

        // Check if city is found
        if (response.status === 404) {
            // Show error message and hide weather section
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else {
            // Parse response JSON
            const data = await response.json();

            console.log(data);

            // Update weather details on page
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = `${Math.round(data.main.temp)}°C`;
            document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
            document.querySelector(".wind").innerHTML = `${data.wind.speed} Km/h`;

            // Set weather icon based on condition
            const weatherCondition = data.weather[0].main;
            switch (weatherCondition) {
                case "Clouds":
                    weatherIcon.src = "images/clouds.png";
                    break;
                case "Clear":
                    weatherIcon.src = "images/clear.png";
                    break;
                case "Rain":
                    weatherIcon.src = "images/rain.png";
                    break;
                case "Drizzle":
                    weatherIcon.src = "images/drizzle.png";
                    break;
                case "Mist":
                case "Haze":
                    weatherIcon.src = "images/mist.png";
                    break;
                default:
                    weatherIcon.src = "images/default.png";
            }

            // Show weather section and hide error
            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.querySelector(".error").style.display = "block";
    }
}

// Add event listener to search button
searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        alert("Please enter a city name.");
    }
});
