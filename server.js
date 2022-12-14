require("dotenv").config({ path: "./config.env" });
const express = require("express");
const mongoose = require("mongoose");
const app = express();
var cors = require('cors');
// const bodyParser = require('body-parser');
var session = require('express-session');
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
      origin: ['https://medicaredemo-frontend.herokuapp.com', 'http://localhost:3006', 'http://localhost:3000'],
      credentials: true,
  })
);
app.use(session({ secret: 'this-is-a-secret-token' }));


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
