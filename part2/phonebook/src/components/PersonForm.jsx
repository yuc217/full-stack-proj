const PersonForm = ({ newName, handleNameChange, newNumber, handleNumberChange, addPerson }) => {
    return (
      <div>
        <form onSubmit={addPerson}>
          <input value={newName} onChange={handleNameChange} />
          <div></div>
          <input value={newNumber} onChange={handleNumberChange} />
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </div>
    )
  }
  export default PersonForm  