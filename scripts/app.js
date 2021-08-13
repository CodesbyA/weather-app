// JS RESPONSIBLE FOR DOM MANIPULATIONS

const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.detail');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {

const {cityDetails, getWeather} = data;

//update details template

details.innerHTML = `
                <h5 class="my-3">${cityDetails.EnglishName}</h5>
                <div class="my-3">${getWeather.WeatherText}</div>
                <div class="display-4 my-4">
                    <span>${getWeather.Temperature.Metric.Value}</span>
                    <span>&deg;C</span>
                </div>
`;

// update day/night/icon images

const iconSrc = `img/icons/icons/${getWeather.WeatherIcon}.svg`;
icon.setAttribute('src', iconSrc);

let timeSrc = getWeather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timeSrc);


//remove the d-none class if present
if (card.classList.contains('d-none')){
    card.classList.remove('d-none');
}

};

//referencing the weather data

const updateCity = async (city) => {

    const cityDetails = await getCity(city);
    const getWeather = await weather(cityDetails.Key);

    return {cityDetails, getWeather};

};

cityForm.addEventListener('submit', e => {
    e.preventDefault();

    //Get city information
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update ui with new city
    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

    // local storage
    localStorage.setItem('city', city);

});

if (localStorage.getItem('city')){
    updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}