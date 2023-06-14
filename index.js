const express = require("express")
const app = express()

const persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    return response.json(persons)
})

app.get('/info', (request, response) => {
    const numPersons = persons.length
    const currentDate = new Date()

    response.send(`Phonebook has info for ${numPersons} people <br/>  ${currentDate}`)
})

PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})