const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(express.static('dist'))
const Person = require('./models/person')
require('dotenv').config()


// let persons = [
//   {
//     "id": 1,
//     "name": "Arto Hellas",
//     "number": "040-123456"
//   },
//   {
//     "id": 2,
//     "name": "Ada Lovelace",
//     "number": "39-44-5323523"
//   },
//   {
//     "id": 3,
//     "name": "Dan Abramov",
//     "number": "12-43-234345"
//   },
//   {
//     "id": 4,
//     "name": "Mary Poppendieck",
//     "number": "39-23-6423122"
//   },
// ]
const cors = require('cors')
app.use(express.json())
app.use(cors())



// app.use(morgan('tiny'))
morgan.token('body', function(req) {
  if (req.method === 'POST'|| req.method === 'PUT') {
    return JSON.stringify(req.body)
  }
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// display hello world in root path
app.get('/', (request, response) => {
  response.send('Hello World!')
})

// get all persons
app.get('/api/persons', (request, response) => {
  // response.json(persons)
  Person.find({}).then(p => {
    response.json(p)
  })
})

// get info on persons
app.get('/info', (request, response) => {
  const currentTime = new Date().toString()
  // get number of persons from mongodb
  Person.countDocuments({}).then(count => {
    const msg = `<p>Phone book has info for ${count} people<p> <p>${currentTime}</p>`
    response.send(msg)
  })
  // const msg = `<p>Phone book has info for ${persons.length} people<p> <p>${currentTime}</p>`
  // response.send(msg);
})

// get person by id
// app.get('/api/persons/:id', (request, response) => {
//   const id = Number(request.params.id)
//   const person = persons.find(p => p.id === id)
//   if (person) {
//     response.json(person)
//   } else {
//     console.log('Person not found')
//     response.status(404).end()
//   }
// })


app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(p => {
      if (p) {
        response.json(p)
      } else {
        response.status(404).end()
      }
    })
    // .catch(err => {
    //   console.log(err)
    //   response.status(400).send({ error: 'malformatted id' })
    // })
    .catch(error => next(error))
})

// generate random id for new person
// const generateId = () => {
//   return Math.floor(Math.random() * 100000)
// }

// create new person
app.post('/api/persons', (request, response, next) => {
  const body = request.body
  // check for required fields
  if (!body.name ||!body.number) {
    return response.status(400).json({
      error: 'name or number is missing'
    })
  }
  // const nameExists = persons.some(p => p.name === body.name)
  // if (nameExists) {
  //   return response.status(400).json({ error: 'name must be unique' })
  // }

  const person = new Person({
    name: body.name,
    number: body.number,
  })
  // persons = persons.concat(person)

  // connect to database
  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})


// delete person by id
app.delete('/api/persons/:id', (request, response, next) => {
  // const id = Number(request.params.id)
  // persons = persons.filter(p => p.id !== id)
  // response.status(204).end()
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// update person by id
app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  // const person = {
  //   name: body.name,
  //   number: body.number,
  // }

  Person.findByIdAndUpdate(request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query'  })
    .then(updatedP => {
      response.json(updatedP)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)

// const PORT = 3001
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})