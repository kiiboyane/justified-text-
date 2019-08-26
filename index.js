

const express = require('express');
const bodyParser = require("body-parser"); 
const cors = require('cors'); 
const path = require('path');

var Auth= require('./routes/authRoute.js');
var Justify= require('./routes/justifyRoute.js');
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


//app.use("/", require("./userRoute")); 

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+'/index.html'))
});
app.get('/justify', function(req, res) {
    res.sendFile(path.join(__dirname+'/justify.html'))
});

let server = app.listen(process.env.PORT || 3000 , function (){
  console.log("Hello")
});  



