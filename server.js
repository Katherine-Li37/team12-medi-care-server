require("dotenv").config({ path: "./config.env" });
const express = require("express");
const mongoose = require("mongoose");
const app = express();
var cors = require('cors');
// const helmet = require('helmet');
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
// app.use(
//   helmet.referrerPolicy({
//     policy: 'no-referrer' // Compliant
//   })
// );
// app.use(
//     cors({
//         origin: ['https://medicaredemo-frontend.herokuapp.com/', 'http://localhost:3006', 'http://localhost:3000'],
//         credentials: true,
//     })
// );
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", '*');
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//     return res.status(200).json({});
//   }
//   next();
// });

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://medicaredemo-frontend.herokuapp.com")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested, Content-Type,Accept Authorization,content-type,application/json"
  )
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "POST, PUT, PATCH, GET, DELETE"
    )
    return res.status(200).json({})
  }
  next()
})

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
const feedbacksRouter = require('./routes/feedbacks');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/clinics', clinicsRouter);
app.use('/appointments', appointmentsRouter);
app.use('/feedbacks', feedbacksRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
