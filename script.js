'use strict';
// const fetch = require("node-fetch");

const key = '4511886fefcb4b61a16133837240811';
const input = document.getElementById('city-search');
const btn = document.getElementById('search-btn');
const weatherInfo = document.getElementById('weather-info');
let help = document.querySelector('.help-text');


btn.addEventListener('click', e =>{
    getWeather(input.value).then(weather => displayWeather(weather));    
})

let getWeather = async (value) => {
    let request = new Request(`http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${value}&days=5&aqi=no&alerts=no`);
    let response = await fetch(request);
    let json = await response.json();
    return json;
}

let displayWeather = data => {
    weatherInfo.innerHTML = '';

    let mainInfo = document.createElement('div');
    mainInfo.innerHTML = `
        <h2 class="main-section-ttl">${data.location.name}</h2>
        <h3 class="section-subttl text-center">${data.location.region}, ${data.location.country}</h3>
        <p class="text-center">${(data.current.is_day === 1) ? 'Currently daytime' : 'Currently nighttime'}</p>
    `;

    let current = document.createElement('div');
    let currentInfo = data.current;

    current.innerHTML = `
        <div class="sub-section xl-font">
            <p class="flex lg-img"><img src="${currentInfo.condition.icon}"> ${currentInfo.temp_c}°C</p>
        </div>
    `;

    let forecast = document.createElement('div');
    let forecastInfo = data.forecast.forecastday;
    forecast.innerHTML = `
        <h2 class="section-ttl text-center">Over the next 5 days</h2>
    `;
    for (const f of forecastInfo) {        
        forecast.innerHTML += `
            <div class="margined">
                <p class="flex lg-font"><img src="${f.day.condition.icon}" class='med-img'> ${f.day.mintemp_c}°C - ${f.day.maxtemp_c}°C (${f.day.avgtemp_c}°C)</p>
                <p class="sm-font text-end">${f.date}</p>
                <hr class="line">
            </div>
        `
    }
    forecast.innerHTML += '</div>';

    weatherInfo.appendChild(mainInfo);
    weatherInfo.appendChild(current);
    weatherInfo.appendChild(forecast);
}