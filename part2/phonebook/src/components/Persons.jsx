const Persons = ({ filteredPersons, handleDelete }) => {
  // console.log(filteredPersons)
    return (
      <div>
        {filteredPersons.map(p =>
        <div key={p.id}>
          <> {p.name} {p.number} </>
          <button onClick={() => handleDelete(p.id)}>delete</button>
        </div> 
        )}
      </div>
  
    )
  }
  export default Persons