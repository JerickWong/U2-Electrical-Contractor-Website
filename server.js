const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const PORT = process.env.PORT || 5000;
const app = express();

const db = require('./db').connection
const userRouter = require('./routes/user-router')
const mtsRouter = require('./routes/mts-router')
const deliveredRouter = require('./routes/delivered-router')

// Init middleware
app.use(express.json({ extended: false }))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser());
app.use(cors())

// Define routers
app.use('/api', mtsRouter)
app.use('/api', deliveredRouter)
app.use('/user', userRouter)

// app.get('/', (req, res) => { res.send(_server) });

app.listen(PORT, () => console.log(`Live at port ${PORT}`))

// module.exports = app;