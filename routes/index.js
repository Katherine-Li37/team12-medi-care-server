var express = require('express');
var router = express.Router();
// var passport = require('passport');
// var User = require('../models/user');
var jwt = require('jsonwebtoken');
// var mongoose = require('mongoose');

var monk = require('monk');
var db = monk(process.env.MONGO_URI);

var collection = db.get('users');

router.get('/', function(req, res) {
    res.render('index', { user: req.user });
});

router.post('/register', function(req, res) {
    collection.insert({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName ? req.body.firstName : null,
        lastName: req.body.lastName ? req.body.lastName : null,
        phone: req.body.phone ? req.body.phone : null,
        status: 'active'
    }, function(err, user) {
        if (err) throw err
        res.send({message: 'User Created', user});
    })
});


// router.post('/register', function(req, res) {
//     User.register(new User({ 
//         username: req.body.username,
//         firstName: req.body.firstName ? req.body.firstName : null,
//         lastName: req.body.lastName ? req.body.lastName : null,
//         phone: req.body.phone ? req.body.phone : null,
//         status: 'active'
//     }), req.body.password, function(err, user) {
//         if (err) throw err;
//         // passport.authenticate('local')(req, res, function() {
//             res.send({message: 'User Created', user});
//         // });
//     });
// });
router.post('/login', function(req, res) {
    res.header('Access-Control-Allow-Origin', 'https://medicaredemo-frontend.herokuapp.com/')
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    res.header("Access-Control-Allow-Credentials", true);

    collection.findOne({ 'username': req.body.username }, function(err, user) {
        if (user.password === req.body.password){
            const token = jwt.sign({
                userId: user._id,
                username: user.username
            }, 'secret-token', { expiresIn: '24h' });
            res.json({ 
                success: true, 
                message: 'Authentication successful', 
                token: token, 
                username: user.username + ',' +  user._id
            });
        } else {
            res.json({ success: false, message: 'Email or password incorrect' })
        }
    })
});

// router.post('/login', (req, res, next) => {
//     passport.authenticate('local', function(err, user, info) {
//         if (err) {
//             res.json({ success: false, message: err })
//         } else {
//             if (!user) {
//                 res.json({ success: false, message: 'Email or password incorrect' })
//             } else {
//                 req.login(user, function(err) {
//                     if (err) {
//                         res.json({ success: false, message: err })
//                     } else {
//                         const token = jwt.sign({
//                             userId: user._id,
//                             username: user.username
//                         }, 'secret-token', { expiresIn: '24h' });
//                         res.json({ 
//                             success: true, 
//                             message: 'Authentication successful', 
//                             token: token, 
//                             username: user.username + ',' +  user._id});
//                     }
//                 })
//             }
//         }
//     })(req, res);
// });

module.exports = router;