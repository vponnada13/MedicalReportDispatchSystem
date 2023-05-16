const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    role: String,
})

const user = mongoose.model('user', userSchema, 'users')

module.exports = user;