import restify from 'restify'
import plugins from 'restify-plugins'
import mongoose from 'mongoose'

var Schema = mongoose.Schema

var personSchema = Schema({
    name: String,
    age: Number
})

mongoose.model('Person', personSchema)

const Person = mongoose.model('Person')

const server = restify.createServer()
const port = process.env.PORT || 8888
mongoose.Promise = global.Promise

// Server setup
server.use(plugins.bodyParser())
server.use(plugins.queryParser())

server.get('/', function(req, res, next) {
    const moment = require('moment')
    let now = moment()
    res.json(200, {
        status: 200,
        now: now.toString(),
        unix_now: now.unix()
    })
})

server.listen(port, () => {
	console.log(`Server listening on ${port}`)
})