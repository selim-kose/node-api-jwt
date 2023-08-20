require('dotenv').config();
const { DB_URI } = process.env


const mongoose = require('mongoose')
mongoose.connect(DB_URI);

const db = mongoose.connection
db.once('connected', () => console.log('Connected to DB'))


module.exports = db;