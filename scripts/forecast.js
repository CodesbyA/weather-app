// JS RESPONSIBLE FOR INTERACTING WITH THE WEATHER API

const key = 'TYRmGV5zhWWeqvijGsVMhplj1yqUBAvG';

//retrieving weather information
const weather = async (ref) => {

    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${ref}?apikey=${key}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];

};


//retrieving city information
const getCity = async (location) => {

    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search'
    const query = `?apikey=${key}&q=${location}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];


};

// Testing async 

// getCity('dallas').then(data => {
//         return weather(data.Key);  //this is a promise where we enter the Key received into weather
//     }).then(data => {
//         console.log(data);
//     }).catch(err => console.log(err));

