const express = require('express');
const route = require('./router/router');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

mongoose.connect("mongodb+srv://kanirudh726:0cczXnVbYKHycDtp@project2-group14.tjfjpyg.mongodb.net/test" ,{
    UseNewUrlParser: true
})

.then( () => console.log("mongoose is connected"))
.catch((err) => console.log(err.message))

app.use('/' , route)

app.listen(process.env.PORT ||3000, function(){
    console.log("express app running on port "+(process.env.port||3000))
})
