const API_KEY =`90cc95d2367aecf54368871beae24d35`;


const SEARCH_BTN = document.getElementById("SearchBtn");
const SERACH_INPUT = document.getElementById("SearchField");
const ERROR_MSG = document.getElementById("ErrorMsg");


const fetchWeather = async (city) => {

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    const response = await fetch(url);
    

    if(response.status === 200) {
        const data = await response.json();
        weatherInfo(data);
        ERROR_MSG.textContent= "";
    }
    else {
        ERROR_MSG.textContent = "Podane miasto nie istnieje";
    }
}

const weatherInfo = (city) => {
    console.log(city);

    const isWarm = city.main.temp > 15 ? 'rgb(250, 121, 62)' : 'rgb(45, 98, 246)';

    const wrapper = document.getElementById("WeatherBox");

// const icon ="http://openweathermap.org/img/w/" + city.weather[0].icon + ".png"

    wrapper.innerHTML = 
    `
      <h2>${city.name}</h2>
      <h3 style="color:${isWarm}">${convertTemp(city.main.temp)}</h3>
      <h3>${convertTemp(city.main.feels_like)} </h3>
      <h3>${city.weather[0].main} </h3>
      <h3>${city.wind.speed}</h3>

    `
}

const convertTemp = (temp) => {
    return (temp - 272.15).toFixed() + "°C";
}
    


SEARCH_BTN.addEventListener("click", () => fetchWeather(SERACH_INPUT.value) );


const getLocation = () => {
    navigator.geolocation.getCurrentPosition( (res)=>showWeatherByLocation(res.coords) )
  }
  getLocation();


  const showWeatherByLocation = async (position) => {
    console.log(position);
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.latitude}&lon=${position.longitude}&appid=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    weatherInfo(data);

  };