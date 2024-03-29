const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const new_name = process.argv[3]
const new_number = process.argv[4]


const url =
  `mongodb+srv://yuc:${password}@cluster0.nosb3pv.mongodb.net/phonebookAPP?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)



const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)


if (process.argv.length === 3) {
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(p => {
      console.log(p.name, p.number)
    })
    mongoose.connection.close()
  })
}

else if (process.argv.length===5) {

  const person = new Person({
    name: new_name,
    number: new_number,
  })

  person.save().then(() => {
    console.log(`added ${new_name} number ${new_number} to phonebook`)
    mongoose.connection.close()
  })
}