const input = document.querySelector(".search-box input");
const button = document.querySelector(".search-box button");

const cityName = document.querySelector(".city");
const temp = document.querySelector(".temp");
const humidity = document.querySelector(".humidity");
const condition = document.querySelector(".condition");

const apiKey = "YOUR_API_KEY_HERE";

button.addEventListener("click", () => {
    let city = input.value;

    city = city.trim();

    if (city.length === 0) {
        alert("Please enter a city name");
        return;
    }

    fetchWeather(city);
});

function fetchWeather(city) {
    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.cod !== 200) {
                alert(`City not found: ${city}`);
                return;
            }

            cityName.innerText = data.name;
            temp.innerText = `🌡 Temperature: ${data.main.temp} °C`;
            humidity.innerText = `💧 Humidity: ${data.main.humidity} %`;
            condition.innerText = `☁ Condition: ${data.weather[0].description}`;
        })
        .catch(() => {
            alert("Network error");
        });
}
