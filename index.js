/*var express = require("express");
var app = express();
var MongoClient = require("mongodb").MongoClient;

app.get("/", function(req, res) {
  res.send("Hello World!");
});

app.get("/users", function() {
  MongoClient.connect("mongodb://localhost:27017/test", function(err, db) {
    if (err) next
    db
      .collection("users")
      .find()
      .toArray(function(err, result) {
        if (err) throw err;

        res.json(result)
      });
  });
});
app.listen(3000,function(){
    console.log('Express app start on port 3000')
});

*/

const express = require('express');
const bodyParser = require("body-parser"); 
//const fs = require("fs");
//const path = require('path');
const cors = require('cors'); 
var Auth= require('./authRoute.js');
const path = require('path');

var Justify= require('./justifyRoute.js');
var cookieParser = require('cookie-parser');
const mongoose  = require("mongoose"); 






// setting up my app
const app = express();
app.use(cookieParser());
app.use(bodyParser.text());
app.use('/api/', Auth);
app.use('/api/', Justify);

// connecting to mongodb :)
mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb://localhost/tictac", { useNewUrlParser: true }) ; 
mongoose.Promise = global.Promise; 


//app.use(cors());
// servng static files 
app.use(express.static("public"));
app.use(cookieParser());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/", require("./userRoute")); 

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+'/index.html'))
});
app.get('/justify', function(req, res) {
    res.sendFile(path.join(__dirname+'/justify.html'))
});

let server = app.listen(process.env.PORT || 3000 , function (){
  console.log("Hello")
});  



