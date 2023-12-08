// DEPENDENCIES
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')


// CONFIGURATION
require('dotenv').config()
const PORT = process.env.PORT
const app = express()
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB:', process.env.MONGO_URI))
    .catch(err => console.error('Could not connect to MongoDB:', err));

// MIDDLEWARE
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))



// ROUTES
app.get('/', (req, res, next) => {
  res.send('Welcome to the Book API')
})
app.get('/books/:_id', (req, res, next) => {
    res.json({ message: 'This is the book route' })}    )

// Book: 
const bookController = require('./controllers/books_controller.js')
app.use('/books', bookController)


// LISTEN
app.listen(PORT, () => {
  console.log('Greetings! From port: ', PORT);
})