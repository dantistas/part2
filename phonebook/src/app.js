import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Persons  = (props) => {
  return (
    <ul>
        {props.namesToShow}
   </ul>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addName}>
        <div>
          name: <input 
          value={props.newName}
          onChange={props.handleNameChange}/>
        </div>
        <div>number: <input 
        value={props.newNumber}
        onChange={props.handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}

const Filter = (props) => {
  return (
    <div>
        <input placeholder='search' value={props.newSearch} onChange={props.handleSearchChange}/>
    </div>
  )
}
const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
        setPersons(response.data)
      })
  }, [])

  const addName = (event) => {
    if(persons.find((name)=>{
    return  name.name.toLowerCase() === newName.toLowerCase()
    })){
      alert (`${newName} is allready in the phonebook`) 
    } else {
      event.preventDefault()
    const nameObject = { 
      name: newName,
      number: newNumber
      
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }
    }
    
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
    console.log(newSearch)
    console.log(event.target.value)
  }
  const  search = persons.filter((person)=> {
    return person.name.toLowerCase().includes(newSearch.toLowerCase())
  })
  
  const namesToShow = search.map((name)=>{
    return <p key={name.name}>{name.name} {name.number}</p>
  })

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange}/>
      <h2>add new</h2>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange}
                  newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons namesToShow={namesToShow}/>
    </div>
  )
}

export default App