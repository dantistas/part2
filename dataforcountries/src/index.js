import React, { useState, useEffect, Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';


const GetWeather = (props) => {
  const [ weather , setWeather] = useState(null)
  const api_key = process.env.REACT_APP_API_KEY
  useEffect(() => {
    setWeather(null)
  axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${props.location}`).then(response => {
      setWeather(response.data)
    })
  }, [])
  if(!weather){
    return <p>loading...</p>
  }else if(weather){
    return (
      <div>
        <h1>Weather in {props.location}</h1>
        <p>temperature: {weather.current.temperature} celsius</p>
        <img src={weather.current.weather_icons} width="100"></img>
        <p>Wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
      </div>
      )
  }
}

const Button = (props) => {
  const click = () => {
    props.setNewSearch(props.country.name)
  }
  return (
    <button onClick={click}>show</button>
    
  )
}



const CountriesToShow = (props) =>{
  const list = props.search.map((country)=>{
    return <div key={country.name}>
      <img src={country.flag} width="25" ></img>
      {country.name} <Button country={country} setNewSearch={props.setNewSearch}/>
    </div> 
  }) 
  const single = props.search.map((country)=>{
    const languages = country.languages.map((language)=>{
      return (
        <li key={language.name}>{language.name}</li>
      )
    })
    return <div key={country.name}>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h5>Spoken languages</h5>
      <ul>{languages}</ul>
      <img src={country.flag} width="300" ></img> 
      <GetWeather location={country.capital, country.name}/>
    </div> 
  })
  if(props.newSearch === ''){
    return (
      <h1>type something...</h1>
    )
  }else if (props.search.length >= 10){
    return (
      <h1>There are more than 10 matches, please be more specific!</h1>
    )
  }else if (props.search.length === 1){
    return single
  } else {
    return list
  }
}



const App = () =>{
  const [ countries , setCountries] = useState([])
  const [ newSearch , setNewSearch] = useState('')
  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
        setCountries(response.data)
      })
  }, [])
  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
    console.log(event.target.value)
  }
  const  search = countries.filter((country)=> {
    return country.name.toLowerCase().includes(newSearch.toLowerCase())
  })
  
  return (
    <div>
    Search Countries: <input placeholder="search" value={newSearch} onChange={handleSearchChange}/>
    <ul>
    <CountriesToShow search={search} newSearch={newSearch} setNewSearch={setNewSearch}/>
  </ul>
    </div>
  )
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


