import restify from 'restify'
import plugins from 'restify-plugins'
import mongoose from 'mongoose'

let Schema = mongoose.Schema

let personSchema = Schema({
    name: String,
    age: Number
})

mongoose.model('Person', personSchema)

const Person = mongoose.model('Person')

const server = restify.createServer()
const port = process.env.PORT || 8888
mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost:1337/Hercules')

mongoose.connection.on('connected', () => {  
    console.log('Mongoose default connection open to ' + 'mongodb://localhost:1337/Hercules')
}) 

mongoose.connection.on('error', (error) => {  
    console.log('Mongoose default connection error: ' + error)
}) 

mongoose.connection.on('disconnected', () => {  
    console.log('Mongoose default connection disconnected') 
})

process.on('SIGINT', () => {  
    mongoose.connection.close(() => { 
        console.log('Mongoose default connection disconnected through app termination') 
        process.exit(0) 
    }) 
})

// Server setup
server.use(plugins.bodyParser())
server.use(plugins.queryParser())

// let p1 = new Person({
//     name: "Gabriel",
//     age: 12
// })

// p1.save()

// let p2 = new Person({
//     name: "João",
//     age: 18
// })

// p2.save()

// let p3 = new Person({
//     name: "Pedro",
//     age: 20
// })

// p3.save()

// let p4 = new Person({
//     name: "Matucas",
//     age:  25
// })

// p4.save()

// let persons = Person.find()

server.get('/', (req, res, next) => {
    const moment = require('moment')
    let now = moment()
    res.json(200, {
        status: 200,
        now: now.toString(),
        unix_now: now.unix()
    })
})


server.get('/persons', (request, response, next) => {
    Person.find({}, (err, doc) => {
        if (err) return response.send(500, err)

        response.send(200, doc)
    })
})

server.listen(port, () => {
	console.log(`Server listening on ${port}`)
})