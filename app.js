// Import npm packages
const express = require('express');
// const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000; 

var cors = require('cors');
// var cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var createError = require('http-errors');

var User = require('./models/user');
//---------------------------------------- END OF IMPORTS---------------------------------------------------

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/medicare', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// mongoose.connection.on('connected', () => {
//     console.log('Mongoose is connected');
// });
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:Ab7ezkeTf@cluster0.qn4zx.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: 'http://localhost:3006', // <-- location of the react app were connecting to
        credentials: true,
    })
);

// app.use(session({ secret: 'this-is-a-secret-token' }));
// app.use(passport.initialize());
// app.use(passport.session());

// // passport config
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
// passport.use(new LocalStrategy(User.authenticate()));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// var doctorDetailsRouter = require('./routes/doctor_details');
var clinicsRouter = require('./routes/clinics');
var appointmentsRouter = require('./routes/appointments');

// HTTP request logger
app.use(morgan('tiny'));
app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/doctor_details', doctorDetailsRouter);
app.use('/clinics', clinicsRouter);
app.use('/appointments', appointmentsRouter);


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

app.listen(PORT, console.log(`Server is starting at ${PORT}`));

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};

//     // render the error page
//     res.status(err.status || 500).json(err);
// });

// if (process.env.NODE_ENV === 'production'){
//     app.use(express.static('client/build'))
// }

// module.exports = app;