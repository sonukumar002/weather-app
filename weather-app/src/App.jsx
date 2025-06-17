import React, { useState } from 'react';
const api = {
  key: "38b00c6eaba32173ad66cc17792efa8e",
  base: "https://api.openweathermap.org/data/2.5/"
}
function App() {
const[query,setQuery]=useState('');
const[weather,setweather]=useState({});

// search function 
const search =evt=>{
  if(evt.key==="Enter"){
    // functio to fetch the weather
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(res=>res.json())
    .then(result=>{
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
    <div className="app">
      <main>
        <div className='search-box'>
          <input type="text"
            className='search-bar'
            placeholder='search...'
            onChange={e=>setQuery(e.target.value)}
            value={query}
            onKeyDown={search}
          />
        </div>
        <div>
          <div className='location-box'>
            <div className='location'>Bangaluru india</div>
            <div className='date'>{DateBuilder(new Date())}

            </div>
          </div>
          <div className="weather-box">
            <div className="temp">
              10&#176;C
            </div>
            <div className="weather">
              sunny
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App
