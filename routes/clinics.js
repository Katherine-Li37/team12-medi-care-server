var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk(process.env.MONGO_URI);

var collection = db.get('clinics');

// clinics/
router.get('/', function(req, res) {
    collection.find({}, function(err, clinics) {
        res.json(clinics);
    })
});

// clinics/id
router.get('/:id', function(req, res) {
    collection.findOne({ _id: req.params.id }, function(err, clinic) {
        if (err) throw err
        res.json(clinic);
    })
});


module.exports = router;