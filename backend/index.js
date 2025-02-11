const express = require("express");

const PORT = require('./config');

const app = express();

// first http get routes 
app.get('/', (request, response)=>{
    console.log(request);
    return response.status(234).send("Welcome To MERN Stack Project");
})


app.listen(PORT, ()=>{
    console.log(`Server running at port:${PORT}`);
});