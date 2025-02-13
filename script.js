const apiKey = '8e97d15bb69bdebf23c76df81c036785'; // Replace with your OpenWeather API Key
let isCelsius = true;

async function getWeather() {
    const city = document.getElementById('city').value;
    if (!city) return;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();

        document.getElementById('city-name').textContent = data.name;
        document.getElementById('description').textContent = data.weather[0].description;
        document.getElementById('temperature').textContent = data.main.temp;
        document.getElementById('humidity').textContent = data.main.humidity;
        document.getElementById('wind-speed').textContent = data.wind.speed;
        document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        
        document.getElementById('weather-info').classList.remove('hidden');
        document.getElementById('error-message').classList.add('hidden');
        
        updateBackground(data.weather[0].main);
    } catch (error) {
        document.getElementById('error-message').textContent = error.message;
        document.getElementById('error-message').classList.remove('hidden');
        document.getElementById('weather-info').classList.add('hidden');
    }
}

document.getElementById('toggle-unit').addEventListener('click', function() {
    let tempElement = document.getElementById('temperature');
    let temp = parseFloat(tempElement.textContent);
    if (isCelsius) {
        temp = (temp * 9/5) + 32;
        this.textContent = '°C';
    } else {
        temp = (temp - 32) * 5/9;
        this.textContent = '°F';
    }
    tempElement.textContent = temp.toFixed(2);
    isCelsius = !isCelsius;
});

function updateBackground(weatherCondition) {
    const background = document.getElementById('weather-background');
    let imageUrl = '';

    switch (weatherCondition.toLowerCase()) {
        case 'clear':
            imageUrl = 'url(clear-sky.jpg)';
            break;
        case 'clouds':
            imageUrl = 'url(cloudy.jpg)';
            break;
        case 'rain':
            imageUrl = 'url(rainy.jpg)';
            break;
        case 'snow':
            imageUrl = 'url(snowy.jpg)';
            break;
        case 'thunderstorm':
            imageUrl = 'url(thunderstorm.jpg)';
            break;
        default:
            imageUrl = 'url(default.jpg)';
    }

    background.style.backgroundImage = imageUrl;
    background.style.backgroundSize = 'cover';
    background.style.backgroundPosition = 'center';
}
