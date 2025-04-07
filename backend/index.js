const express = require('express');
const app = express();

require('dotenv').config();
require('./Models/db');


app.get("/ping" ,(req,res) =>{
    res.send("Working");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT,() =>{
    console.log(`Serer is running on ${PORT}`);
})