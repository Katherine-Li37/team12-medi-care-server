var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var monk = require('monk');
var db = monk(process.env.MONGO_URI);

var collection = db.get('feedbacks');


// // appointments/clinic/id: get appointment by clinic id
// router.get('/clinic/:id', function(req, res) {
//     collection.find({ 'clinicID': req.params.id }, function(err, appointments) {
//         res.json(appointments);
//     })
// });

// // appointments/patient/id: get appointment by patient id
// router.get('/patient/:id', function(req, res) {
//     collection.find({ 'patientID': req.params.id }, function(err, appointments) {
//         res.json(appointments);
//     })
// });

// add new appointment: feedbacks/create
router.post('/create', function(req, res) {
    collection.insert({
        appointmentID: req.body.appointmentID,
        rating: req.body.rating,
        comment: req.body.comment,
    }, function(err, feedback) {
        if (err) throw err
        res.json({ success: true, feedback: feedback })
    })
});

// // update appointment: appointments/update/:id
// router.post('/update/:id', function(req, res) {
//     collection.update({ _id: req.params.id }, {
//         $set: {
//             date: req.body.date,
//             time: req.body.time,
//             procedure: req.body.procedure,
//             status: req.body.status,
//         }
//     }, function(err, appointment) {
//         if (err) throw err
//         res.json(appointment);
//     })
// });

module.exports = router;