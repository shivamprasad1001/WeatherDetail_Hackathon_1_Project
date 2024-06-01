let apiKey = '8f4610b169494599bdcd3cd75bc2d463';

let UserLocatio = document.getElementById('UserLocatio');
let UserLocationData = document.getElementById('UserLocationData');
let temp = document.getElementById('temp');
let hiTem = document.getElementById('hiTem');
let lowTem = document.getElementById('lowTem');
let tempType = document.getElementById('tempType');
let likeTemp = document.getElementById('likeTemp');

// Get weather details function
const getWeatherDetails = async (latitude, longitude) => {
    let apiKey2 = 'e16d74b8a1cfaa7a55be20e51934b263';
    let apiURL2 = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey2}&units=metric`;

    try {
        const res = await fetch(apiURL2);
        if (!res.ok) {
            throw new Error(`HTTP error: ${res.status}`);
        }

        const data = await res.json();
        console.log(data);
        
        // Update the DOM elements with weather data
        temp.textContent = `${data.main.temp}°C`;
        hiTem.textContent = `High: ${data.main.temp_max}°C`;
        lowTem.textContent = `Low: ${data.main.temp_min}°C`;
        tempType.textContent = data.weather[0].main;
        likeTemp.textContent = `Feels like: ${data.main.feels_like}°C`;
        UserLocationData.style.color = "#03962a";
        // Update wind, humidity, and pressure data
        let windElement = document.querySelector('.wind p#weatherCurrentData');
        windElement.textContent = `Speed: ${data.wind.speed} m/s, Direction: ${data.wind.deg}°`;

        let humidityElement = document.querySelector('.wind:nth-child(2) p#weatherCurrentData');
        humidityElement.textContent = `Humidity: ${data.main.humidity}%`;

        let pressureElement = document.querySelector('.wind:nth-child(3) p#weatherCurrentData');
        pressureElement.textContent = `Pressure: ${data.main.pressure} hPa`;

    } catch (error) {
       
        console.error("Error fetching weather details:", error);
    }
};

// Get user address function
const getUserAddress = async (latitude, longitude) => {
    getWeatherDetails(latitude, longitude);

    let apiURL = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}%2C${longitude}&key=${apiKey}`;
    try {
        const res = await fetch(apiURL);
        if (!res.ok) {
            throw new Error(`HTTP error: ${res.status}`);
        }

        const data = await res.json();
        console.log(data);

        const {city, state, postcode, country} = data.results[0].components;
        let citySData =  `Location: ${city}, ${state}, ${postcode}, ${country}`;
        localStorage.setItem('cityData',citySData);
        UserLocationData.textContent = localStorage.getItem("cityData");

    } catch (error) {
        console.error("Error fetching user address:", error);
        UserLocationData.textContent = error.message;
    }
};

// Add event listener for getting user's location
 const gettingLan_Long = () => {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            getUserAddress(latitude, longitude);
        },
        (error) => {
            console.error("Error getting geolocation:", error);
            UserLocationData.textContent = error.message;
            UserLocationData.style.color = "#red";

        }
    );
};
setTimeout(gettingLan_Long, 2000);

    const emergencyButton = document.getElementById('emergencyButton');
    function handleEmergencyButtonClick() {
        const emergencyNumber = '108';
        const telURL = `tel:${emergencyNumber}`;
        window.location.href = telURL;  // Redirect to the tel URL to initiate the call
    }
    emergencyButton.addEventListener('click', handleEmergencyButtonClick);
