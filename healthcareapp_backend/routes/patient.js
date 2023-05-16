const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')

const User = require('../model/userModel');
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


router.post('/create', (req, res) => {
    console.log(req.body,'in patient create')
    let patientData = req.body;
    Patient.insertMany(patientData, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            if (data) {
                console.log(data, 'patient Data')
            }
        }
    })
})

router.get('/viewAllPatients', verifyToken, (req, res) => {

    console.log(req.userId, 'req.userId')
    User.findOne({ _id: req.userId }, (err, user) => {
        if (err) {
            console.log(err, 'err')
        } else {
            if (!user) {
                console.log('user not found')
            } else {
                if (user) {
                    console.log(user, 'user')
                    if (user.role == "doctor") {
                        console.log('doctor logged in')
                        Patient.find({}, (err, data) => {
                            if (err) {
                                console.log(err)
                            } else {
                                // console.log(data, 'data of all patients')
                                res.send(data)
                            }
                        })
                    } else {
                        if (user.role == "lab") {
                            console.log('lab logged in')
                            Patient.find({ sendtolab: 'yes'}, (err, data) => {
                                if (err) {
                                    console.log(err)
                                } else {
                                    let nopriority = [];
                                    let priority = [];
                                    data.map((v,i) => {
                                        console.log(v, 'v')
                                        console.log(i, 'i')
                                        if (v.priority == 'nopriority') {
                                            nopriority.push(v)
                                            // console.log(newArr, 'inside newArr')
                                        } else {
                                            priority.push(v)
                                        }
                                    })
                                    console.log(nopriority, 'nopriority')
                                    console.log(priority, 'priority')
                                    let priority1 = priority.find(o => o.priority == 'priority1')
                                    let priority2 = priority.find(o => o.priority == 'priority2')
                                    let priority3 = priority.find(o => o.priority == 'priority3')
                                    let priority4 = priority.find(o => o.priority == 'priority4')
                                    let priority5 = priority.find(o => o.priority == 'priority5')
                                    let priority6 = priority.find(o => o.priority == 'priority6')
                                    let priority7 = priority.find(o => o.priority == 'priority7')
                                    console.log(priority1, 'priority1')
                                    console.log(priority2, 'priority2')
                                    console.log(priority3, 'priority3')
                                    console.log(priority4, 'priority4')
                                    console.log(priority5, 'priority5')
                                    console.log(priority6, 'priority6')
                                    console.log(priority7, 'priority7')
                                    let PriorityMerge = [].concat(priority1, priority2, priority3, priority4, priority5, priority6, priority7, nopriority)
                                    console.log(PriorityMerge, 'PriorityMerge')
                                    let PriorityMergeFinal = PriorityMerge.filter(function( element ) {
                                        return element !== undefined;
                                    })
                                    console.log(PriorityMergeFinal, 'PriorityMergeFinal')
                                    // return false
                                     res.send(PriorityMergeFinal)
                                }
                            })
                        }
                    }

                }
            }
        }
    })
    return false
})

router.post('/delete', (req, res) => {
    console.log(req.body)
    Patient.deleteMany({ _id: req.body._id}, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            console.log(data, 'deleted')
            res.send(data)
        }
    })
})

router.post('/getPatientById', (req, res) => {
    console.log(req.body)
    Patient.findOne({ _id: req.body.patientId }, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            console.log(data)
            res.send(data)
        }
    })
})

router.post('/updatePatientById', (req, res) => {
    console.log(req.body)
    let data = req.body;
    Patient.findOneAndUpdate({ _id: data._id }, data , (err, data) => {
        if (err) {
            console.log(err)
        } else {
            console.log(data, 'update')
            res.send(data)
        }
    })
})

router.get('/viewAllPatientsBylab', (req, res) => {
    Patient.find({ sendtolab: 'yes'}, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            let nopriority = [];
            let priority = [];
            data.map((v,i) => {
                console.log(v, 'v')
                console.log(i, 'i')
                if (v.priority == 'nopriority') {
                    nopriority.push(v)
                    // console.log(newArr, 'inside newArr')
                } else {
                    priority.push(v)
                }
            })
            console.log(nopriority, 'nopriority')
            console.log(priority, 'priority')
            let priority1 = priority.find(o => o.priority == 'priority1')
            let priority2 = priority.find(o => o.priority == 'priority2')
            let priority3 = priority.find(o => o.priority == 'priority3')
            let priority4 = priority.find(o => o.priority == 'priority4')
            let priority5 = priority.find(o => o.priority == 'priority5')
            let priority6 = priority.find(o => o.priority == 'priority6')
            let priority7 = priority.find(o => o.priority == 'priority7')
            console.log(priority1, 'priority1')
            console.log(priority2, 'priority2')
            console.log(priority3, 'priority3')
            console.log(priority4, 'priority4')
            console.log(priority5, 'priority5')
            console.log(priority6, 'priority6')
            console.log(priority7, 'priority7')
            let PriorityMerge = [].concat(priority1, priority2, priority3, priority4, priority5, priority6, priority7, nopriority)
            console.log(PriorityMerge, 'PriorityMerge')
            let PriorityMergeFinal = PriorityMerge.filter(function( element ) {
                return element !== undefined;
            })
            console.log(PriorityMergeFinal, 'PriorityMergeFinal')
            // return false
             res.send(PriorityMergeFinal)
        }
    })
})

router.get('/viewAllPatients/statusCompleted', (req, res) => {
    Patient.find({ status: 'completed' }, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            console.log(data, 'status data of all patients')
            res.send(data)
        }
    })
})

 module.exports = router;