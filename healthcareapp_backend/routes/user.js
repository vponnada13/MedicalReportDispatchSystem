const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')

const User = require('../model/userModel');
const mongoose = require('mongoose');
const Patient = require('../model/patientModel');

function verifyToken(req, res, next) {
    console.log(req.headers.authorization)
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization
    if (token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload) {
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next()
 }

 router.post('/register', (req,res) => {
    let userData = req.body
     console.log(userData)
    let user = new User(userData)
    user.save((error, data) => {
        if(error) {
            // console.log(error)
            res.send(error)
        } else {
            let payload = { subject: data._id }
            console.log(payload)
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({token})
        }
    })
})


router.post('/login', (req,res) => {
    let userData = req.body;

    User.findOne({ email: req.body.email}, (err, user) => {
        if(err) {
            console.log(err);
        } else {
            if(!user) {
                console.log('invalid email')
                res.status(401).send('Invalid email')
            } else {
                if(user.password !== userData.password) {
                    res.status(401).send('Invalid Password')
                } else {
                    let payload = { subject: user._id}
                    let token = jwt.sign(payload, 'secretKey')
                    res.status(200).send({token})
                }
            }
        }
    })
})

router.get('/userRole', verifyToken, (req, res) => {
    console.log(req.userId, 'req.userId')
    User.findOne({ _id: req.userId }, (err, user) => {
        if (err) {
            console.log(err)
        } else {
            if (!user) {
                console.log('user not found')
            } else {
                if (user) {
                    // console.log(user, 'user')
                    res.send(user.role)
                }
            }
        }
    })
})

module.exports = router;