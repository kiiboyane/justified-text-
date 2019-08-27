const express = require('express');
const stringLength = require('string-length');
const router = express.Router(); 
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config.js');
var VerifyToken = require('../verifyToken');
var User = require('../models/user.js');
var justifytext = require("../work/justifytext.js");


router.post('/justify' ,VerifyToken, function(req , res , next){
  let token = req.cookies['x-access-token'];
  let today = new Date().toISOString().replace('T', ' ').substr(0, 10).replace(' ', ''); 
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    //  { password: 0 }, this part to not view the password 
    User.findById(decoded.id, { password: 0 }, function (err, user) {
	  if (err) return res.status(500).send("There was a problem finding the user.");
	  if (!user) return res.status(404).send("No user found.");
	  res.set('Content-Type', 'text/plain');// this is for the whitespaces , if u remove it, this happens "a      f" is equal to "a f"
	  let characters = req.body.length; 
	  let text = req.body ; 
      if(user.lastuse != today && characters<80000 ){
           User.findByIdAndUpdate({_id : user._id }, { lastuse : today ,  consuming : characters}).then(function(){
            // check if the user surpassed 80000 per day 
      		  let txt = justifytext.justifytext(req.body); 
	 		      res.status(200).send(txt);
	       });
      }else{
      	   count = characters ; 
      	   if(user.consuming != undefined ) count += user.consuming; 
           if(user.lastuse === today && ((characters <80000 && user.consuming === undefined )|| characters+ user.consuming<80000) ){
           	    User.findByIdAndUpdate({_id : user._id }, {consuming : count} ).then(function(){
	               // check if the user surpassed 80000 per day 
	      		   let txt = justifytext.justifytext(text); 
		 		   res.status(200).send(txt);
	          });
           }else{
             if(characters==null){
             // remove this 
             User.findByIdAndUpdate({_id : user._id }, { lastuse : today ,  consuming : characters}).then(function(){
             // check if the user surpassed 80000 per day 
             //let txt = justifytext.justifytext(req.body); 
             //res.status(200).send(txt);
                 res.status(404).send(""); 
             res.status(402).send("Payment Required") ;   
             }); 
             }
             // remove this 
              // res.status(402).send("Payment Required") ;		
           } 
      }

	});
  });
    
}); 


module.exports = router; 