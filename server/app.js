const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

app.use(express.json());


const orderRouter = require('./routers/orderRouter');
const doctorRouter = require('./routers/doctorRouter');
const userRouter = require('./routers/userRouter');
const appointmentRouter = require('./routers/appointmentRouter')
app.use('/api/v1/appointment',appointmentRouter)
app.use('/api/v1/users',userRouter)
app.use('/api/v1/doctors',doctorRouter);
app.use('/api/v1',orderRouter);



module.exports = app;