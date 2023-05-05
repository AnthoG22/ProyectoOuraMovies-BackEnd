const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const cors = require('cors')
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 3000

connectDB()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/ouramovies/api/movies', require('./routes/peliculasRoutes.js'))
app.use('/ouramovies/api/users', require('./routes/usersRoutes.js'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server iniciado en el puerto ${port}`))