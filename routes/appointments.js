var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var monk = require('monk');
var db = monk(process.env.MONGO_URI);

var collection = db.get('appointments');


// appointments/clinic/id: get appointment by clinic id
router.get('/clinic/:id', function(req, res) {
    collection.find({ 'clinicID': req.params.id }, function(err, appointments) {
        res.json(appointments);
    })
});

// appointments/patient/id: get appointment by patient id
router.get('/patient/:id', function(req, res) {
    collection.find({ 'patientID': req.params.id }, function(err, appointments) {
        res.json(appointments);
    })
});

// appointments/appointment/id: get appointment by patient id
router.get('/appointment/:id', function(req, res) {
    collection.find({ '_id': req.params.id }, function(err, appointments) {
        res.json(appointments);
    })
});

// add new appointment: appointments/create
router.post('/create', function(req, res) {
    collection.insert({
        clinicID: req.body.clinicID,
        clinicName: req.body.clinicName,
        patientID: req.body.patientID,
        patientName: req.body.patientName,
        date: req.body.date,
        time: req.body.time,
        procedure: req.body.procedure,
        ifCheckedIn: false,
        ifRated: false,
        status: req.body.status
    }, function(err, appointment) {
        if (err) throw err
        res.json(appointment);
    })
});

// update appointment: appointments/update/:id
router.post('/update/:id', function(req, res) {
    collection.update({ _id: req.params.id }, {
        $set: {
            clinicID: req.body.clinicID,
            clinicName: req.body.clinicName,
            patientID: req.body.patientID,
            patientName: req.body.patientName,
            date: req.body.date,
            time: req.body.time,
            procedure: req.body.procedure,
            status: req.body.status,
            ifCheckedIn: req.body.ifCheckedIn,
            ifRated: req.body.ifRated
        }
    }, function(err, appointment) {
        if (err) throw err
        res.json({ success: true, appointment: appointment })
    })
});

module.exports = router;