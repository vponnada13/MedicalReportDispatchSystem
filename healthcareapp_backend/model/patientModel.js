const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const patientSchema = new Schema({
    name: String,
    age: String,
    gender: String,
    issue: String,
    test: String,
    priority: String,
    sendtolab: String,
    status: String,
    healthstatus: String,
})

const patient = mongoose.model('patient', patientSchema, 'patients')

module.exports = patient;