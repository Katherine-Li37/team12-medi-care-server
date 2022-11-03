require("dotenv").config({ path: "./config.env" });
const express = require("express");
const mongoose = require("mongoose");
const app = express();
var cors = require('cors');
// var cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
// var createError = require('http-errors');
// var User = require('./models/user');
//  End of Imports

// ----------------- Driver Code --------------------------------------------
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },() => {
    console.log('Mongoose is connected');
  }
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: ['https://team12-medi-care.surge.sh/', 'http://localhost:3006', 'http://localhost:3006'],
        credentials: true,
    })
);
app.use(session({ secret: 'this-is-a-secret-token' }));
// app.use(passport.initialize());
// app.use(passport.session());

// passport config
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
// passport.use(new LocalStrategy(User.authenticate()));


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const clinicsRouter = require('./routes/clinics');
const appointmentsRouter = require('./routes/appointments');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/clinics', clinicsRouter);
app.use('/appointments', appointmentsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
