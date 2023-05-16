const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const PORT = 8000

const user = require('./routes/user');
const patient = require('./routes/patient');
const app = express();

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user', user);
app.use('/patient', patient)

app.get('/', (req,res) => {
    res.send('Hello from server')
})

app.listen(PORT, ()=> {
    console.log('Server is running on localhost:' + PORT);
})

const db = "mongodb://localhost:27017/myProject";

mongoose.connect(db, (err) => {
    err => console.log(err)
    console.log('Connected to the database')
})