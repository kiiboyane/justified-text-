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

var Justify= require('./justifyRoute.js');
const mongoose  = require("mongoose"); 



// for the communication with the client 
//const cors = require('cors'); 
//const fileUpload = require('express-fileupload');



// setting up my app
const app = express();

app.use(bodyParser.text());
app.use('/api/', Auth);
app.use('/api/', Justify);

// connecting to mongodb :)
mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb://localhost/tictac", { useNewUrlParser: true }) ; 
mongoose.Promise = global.Promise; 


//app.use(cors());
//app.use(fileUpload());
// servng static files 
app.use(express.static("public"));

//first middleware to parse the req to json 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
//app.use('/', proxy());


app.use("/", require("./userRoute")); 

app.get('/', function(req, res) {
  res.send("Hello world"); 
    //res.sendFile(path.join(__dirname+'/index.html'))
});
// the error handler middleware
/*app.use(function( err , req , res , next){
  // console.log(err.message.errors) ; 
    res.status(422).send({message : err.message});
});
app.get('/', function(req, res){
   res.redirect('/launcher');
});
app.get('/index', function (req, res) {
    res.sendFile(path.join(__dirname+'/index.html'))
});
app.get('/reciever', function (req, res) {
    res.sendFile(path.join(__dirname+'/reciever.html'))
});
app.get('/launcher', function (req, res) {
    res.sendFile(path.join(__dirname+'/launcher.html'))
});
app.get('/connect/:id', function (req, res) { 
   //console.log(req.params.id); 
   res.sendFile(path.join(__dirname+'/connect.html'))   
   //res.send(req.params.id);
});
app.get('/test', function (req, res) {
    res.sendFile(path.join(__dirname+'/test.html'))
});
app.get('/NOTFOUND', function (req, res) {
    res.sendFile(path.join(__dirname+'/404.html'))
});
app.post('/connectIndex', function (req, res) {
   console.log(req.body); 
   res.redirect('/test');   
});
*/
let server = app.listen(process.env.PORT || 3000 , function (){
  console.log("Hello")
});  



