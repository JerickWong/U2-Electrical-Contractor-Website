const express = require('express');
const MongoClient = require('mongoose')
const connectDB = require('./config/db')

const PORT = process.env.PORT || 5000;
const app = express();

// Connect to DB
connectDB()

// Init middleware
app.use(express.json({ extended: false }))

// Define routers
app.use('/api/account', require('./routes/api/account'))
app.use('/api/mts', require('./routes/api/mts'))
app.use('/api/auth', require('./routes/api/auth'))

app.get('/', (req, res) => { res.send(_server) });

app.listen(PORT, () => console.log(`Live at port ${PORT}`))

// module.exports = app;