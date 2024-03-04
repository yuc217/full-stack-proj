import Part from './Part'
import Header from './Header'

const Course = ({course}) => {

  return ( 
  <div>
    <h1> Web development curriculum </h1>
    {course.map(c => 
       <div key = {c.id}>
          <Header head = {c.name} />
          <Part parts = {c.parts} />
        </div>
    )} 
   </div>
  )
}

export default Course