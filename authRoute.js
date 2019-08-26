var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var User = require('./user.js');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('./config.js');
var VerifyToken = require('./verifyToken');


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.post('/signup', function(req, res) {
  
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  
  User.create({
    name : req.body.name,
    username : req.body.username,
    password : hashedPassword, 
    lastuse : "-", 
    member : false , 
    cosuming : 0 
  },
  function (err, user) {
    if (err) return res.status(500).send("There was a problem registering the user.")
    res.status(200).send({ auth: true });
  }); 
});



router.get('/getuser', VerifyToken,function(req, res) {
  let token = req.cookies['x-access-token'];
  console.log(token); 
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    //  { password: 0 }, this part to not view the password 
    User.findById(decoded.id, { password: 0 }, function (err, user) {
	  if (err) return res.status(500).send("There was a problem finding the user.");
	  if (!user) return res.status(404).send("No user found.");
	  
	  res.status(200).send(user);
	});
  });
});


router.post('/signin', function(req, res) {

  User.findOne({ username: req.body.username }, function (err, user) {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('No user found.');
    
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
    
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.setHeader('Set-Cookie', 'x-access-token='+token+'; HttpOnly');
    res.status(200).send({ auth: true });
  });
  
});

router.get('/logout', function(req, res) {
  res.status(200).send({ auth: false, token: null });
});

module.exports = router;