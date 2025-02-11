const express = require("express");

const PORT = require('./config');
// const mongoDBURL = require('./config');
const mongoDBURL = 'mongodb://0.0.0.0/mydb1';

const mongoose = require('mongoose');

const app = express();

// first http get routes 
app.get('/', (request, response)=>{
    console.log(request);
    return response.status(234).send("Welcome To MERN Stack Project");
})

// database connection
mongoose.connect(mongoDBURL)
.then(()=>{
    console.log("App is connected to mongoDB Database");
})
.catch((error)=>{
    console.log(error);
})


app.listen(PORT, ()=>{
    console.log(`Server running at port:${PORT}`);
});