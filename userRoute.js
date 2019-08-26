const express = require('express');
const router = express.Router(); 
const User = require("./user.js") ; 


// getting a list of current users 
/*
router.get('/users' , function(req , res , next){
	User.find({}).then(function(users){
			  res.send(users); 
	});
}); 
*/

//adding a  new user // new nerd added 
/*router.post('/adduser' , function(req , res , next){
	        console.log(req.body.tags);
			User.create(req.body).then(function(user){
				console.log(user);
				res.send(JSON.stringify(user._id));
			}).catch(next); 
}); 




//delete a user 
router.post('/deleteuser/:_id' , function(req , res, next){
	 console.log("really what did he/she do ? ");
	 User.findOneAndRemove({_id : req.params._id}).then(function(user){
	 	res.send(user); 
	});
}); 
*/



module.exports = router; 
