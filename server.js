require("dotenv").config({ path: "./config.env" });
const express = require("express");
const connectDB = require("./config/db");
const postRouter = require("./routes/postRoutes");
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
// const doctorDetailsRouter = require('./routes/doctor_details');
const clinicsRouter = require('./routes/clinics');
const appointmentsRouter = require('./routes/appointments');

connectDB();

const app = express();

app.use(express.json());

app.use("/api/v1/posts", postRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/doctor_details', doctorDetailsRouter);
app.use('/clinics', clinicsRouter);
app.use('/appointments', appointmentsRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
