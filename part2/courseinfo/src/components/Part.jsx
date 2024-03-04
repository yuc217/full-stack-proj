
const Part = ({parts}) => {
  // {parts.map(c => console.log(c))}
  return (
    <div>
      {parts.map(c => 
          <p key = {c.id}>
            {c.name} {c.exercises}
            </p>
        )}

        <b> 
          total of {parts.reduce( (sum, c)=>
            sum + c.exercises , 0
            )} exercises
        </b>
    </div>
    )
}

export default Part