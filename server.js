require('dotenv').config()

const express = require('express')
const app = express()
const morgan = require('morgan')
const path = require('path')
const cookieParser = require('cookie-parser')
const fs = require('fs')


const db = require('./repository/playerRepository')
const authRouter = require('./routes/authRoutes')
const playerRouter = require('./routes/playerRoutes')
const healthCheckRouter = require('./routes/healthCheck')
const cors = require('cors')


const { PORT } = process.env || 8000


const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

//Middleweare
app.use(morgan('combined', { stream: accessLogStream })) // Morgan logg
app.use(express.json()) // Handle JSON req-body
app.use(cookieParser())
app.use(cors()) // Cross Origin Resource Sharing
app.use(express.urlencoded({ extended: false })) //Handle URLencoded form data
app.use('/', express.static(path.join(__dirname, '/public'))) // Serve static files CSS
app.use('/', healthCheckRouter)

//Routes
app.use('/api/auth', authRouter)
app.use('/api/players', playerRouter)

console.log()



app.listen(8000, () => console.log(`Server listnening on port ${PORT}`))