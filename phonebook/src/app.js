import React, { useState, useEffect } from 'react'
import contactService from './services/contacts';


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
    contactService
    .getAll().then(initialContacts => {
        setPersons(initialContacts)
      })
  }, [])

  const addName = (event) => {
    if(persons.find((name)=>{
    return  name.name.toLowerCase() === newName.toLowerCase()
    })){
      window.confirm(`${newName} is allready in the phonebook.Replace the old one with a new one ?`)
      event.preventDefault()
      const contact =persons.find((name)=>{
        return  name.name.toLowerCase() === newName.toLowerCase()
        })
        const updatedContact = { 
          name: newName,
          number: newNumber
          
        }
      contactService
      .update(contact.id, updatedContact).then(returnedContact => {
        setPersons(persons.map(person => person.id !== contact.id ? person : returnedContact))
      })
      setNewName('')
      setNewNumber('')
    } else {
      event.preventDefault()
    const nameObject = { 
      name: newName,
      number: newNumber
      
    }
    contactService
    .add(nameObject).then(returnedContact => {
      setPersons(persons.concat(returnedContact))
      setNewName('')
      setNewNumber('')
    } )
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
    const deleteContact =() => {
      if (window.confirm(`Are you sure you want to delete ${name.name} `)) { 
      contactService
      .erase(name.id).then(()=>{
        setPersons(persons.filter(person => person.id !== name.id))
      })
      contactService
      .getAll().then(initialContacts => {
        setPersons(initialContacts)
      })
      }
    }
    return <div key={name.name}>
              <p>{name.name} {name.number}</p>
              <button onClick={deleteContact}>delete {name.name}</button>
            </div>
          
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