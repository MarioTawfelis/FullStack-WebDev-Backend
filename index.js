const express = require("express")
const morgan = require("morgan")

morgan.token('req-body', (req) => {
    return JSON.stringify(req.body)
  })

const loggingFormat = ':method :url :status :res[content-length] - :response-time ms :req-body';

const app = express()
app.use(express.json())
app.use(morgan(loggingFormat))

let persons = [
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

app.get('/api/persons/:id', (request,response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if(person){
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request,response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request,response) => {
    const body = request.body

    if (persons.find(p => p.name === body.name)) {
        return response.status(404).json({
            error: "name must be unique"
        })
    }

    if (!body.name || !body.number){
        return response.status(404).json({
            error: "content missing"
        })
    }

    const person = {
        id: Math.random(1000),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)

    response.json(person)
})

PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})