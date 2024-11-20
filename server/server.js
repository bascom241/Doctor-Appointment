const app = require('./app')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');

dotenv.config({path:'./.env'});

const data = process.env.DATABASE_URL;

mongoose.connect(data,{
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useFindAndModify:false
}).then(()=>{
    console.log('Database Connected')
}).catch(err=> console.log('DataBase connection error' + err.message))


const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log('Listenning on port' + port)
})


