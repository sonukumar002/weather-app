import React, { useState } from 'react';
// import {FaSearchLocation} from 'react-icons/fa';
import '@fortawesome/fontawesome-free/css/all.min.css';


console.log("API KEY:", import.meta.env.API_KEY);
const api = {
  key: import.meta.env.VITE_WEATHER_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/"
}
function App() {
  const [query, setQuery] = useState('');
  const [weather, setweather] = useState({});

  // search function 
  const search = evt => {
    if (evt.key === "Enter") {
      // functio to fetch the weather
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setweather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const DateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "october", "November", "December"];
    let days = ["sunday", "Monday", "Tuesady", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`
  }
  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 26) ? "app-warm" : "app") : "app"}>
      <main>
        <div className='search-box'>
          <div className="search-input-wrapper">
            <i class="fa-solid fa-location-dot"></i>
            <input type="text"
              className='search-bar'
              placeholder='search...'
              onChange={e => setQuery(e.target.value)}
              value={query}
              onKeyDown={search}
            />
          </div>
        </div>

        {(typeof weather.main != "undefined") ? (
          <div>
            <div className='location-box'>
              <div className='location'>{weather.name}.{weather.sys.country}</div>
              <div className='date'>{DateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}&#176;C
              </div>
              <div className="weather">
                <img
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt='weather-icon'
                />
                <p>{weather.weather[0].main}</p>
              </div>
            </div>

          </div>

        ) : ('')}
      </main>
    </div>
  );
}

export default App
