import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios'

const CountriesToShow = (props) =>{
  const list = props.search.map((country)=>{
    return <div key={country.name}>
      <img src={country.flag} width="25" ></img>
      {country.name}
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
    <CountriesToShow search={search} newSearch={newSearch}/>
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


