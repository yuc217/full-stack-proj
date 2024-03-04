import { useState, useEffect } from 'react'
import personService from './services/persons'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [notif, setNotif] = useState({ message: null, type: null })


  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  )

  const addPerson = (event) => {
    event.preventDefault()

    if (newName === '' || newNumber === '') {
      alert("it's empty!")
      return
    }

    const nameExists = persons.some((person) => person.name.toLowerCase() === newName.toLowerCase())

    if (nameExists) {
      const confirmUpdate = window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)
      if (confirmUpdate) {
        const updatedPerson = persons.find((person) => person.name === newName)
        const updateId = updatedPerson.id
        const changedPerson = { ...updatedPerson, number: newNumber }
        personService
          .update(updateId, changedPerson)
          .then(returnPerson => {
            setPersons(persons.map(p => p.id !== updateId ? p : returnPerson))
            handleNotification(`Number of ${updatedPerson.name} is changed` , 'success')
            setNewNumber('')
            setNewName('')
          })
          .catch(error => {
            handleNotification(
              `Information of ${newName} has already been removed from server`, 'error'
            )
            setPersons(persons.filter(n => n.id !== updateId))
          })
      }

      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }
    // setPersons(persons.concat(personObject))
    // setNewName('')
    // setNewNumber('')

    personService
      .create(personObject)
      .then(newp => {
        setPersons(persons.concat(newp))
        handleNotification(`Added ${newp.name}`, 'success')
        setNewNumber('')
        setNewName('')
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const handleNotification = (message, type) => {
    setNotif({ message, type })

    setTimeout(() => { setNotif({ message: null, type: null }) }, 5000)
  }

  const handleDelete = (id) => {
    const deletePerson = persons.find((persons) => persons.id === id)
    // console.log(deletePerson) 
    const confirmDelete = window.confirm(`Delete ${deletePerson.name} ?`)

    if (confirmDelete) {
      const updatedPersons = persons.filter((person) => person.id !== id)
      personService
        .deleteOne(id)
        .then(() => {
          setPersons(updatedPersons)
        })

    }
  }

  return (
    <div>

      <h2>Phonebook</h2>
      <Notification message={notif.message} type={notif.type} />
      <Filter search={search} handleSearchChange={handleSearchChange} />
      <h2>add a new </h2>
      <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  )
}

export default App