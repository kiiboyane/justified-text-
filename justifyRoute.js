const express = require('express');
const stringLength = require('string-length');
const router = express.Router(); 
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('./config.js');
var VerifyToken = require('./verifyToken');
var User = require('./user.js');


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
      		let txt = justifytext(req.body); 
	 		res.status(200).send(txt);
	       });
      }else{
      	   count = characters ; 
      	   if(user.consuming != undefined ) count += user.consuming; 
           if(user.lastuse === today && ((characters <80000 && user.consuming === undefined )|| characters+ user.consuming<80000) ){
           	    User.findByIdAndUpdate({_id : user._id }, {consuming : count} ).then(function(){
	               // check if the user surpassed 80000 per day 
	      		   let txt = justifytext(text); 
		 		   res.status(200).send(txt);
	          });
           }else{
               res.status(402).send("Payment Required") ;		
           } 
      }

	});
  });
    
}); 
module.exports = router; 


function justifytext(text){
    text = text.replace(/\n/g," ");
    text = text.replace(/\r/g," ");
    text = text.replace(/\t/g," ");
	text = text.replace(/ {1,}/g," ");
	text = text.trim();
	words = text.split(" ");
    let newtext = ""; 
    let lineCount = 0;
    let currentLine ="" ;
    for(let i=0 ;i<words.length; i++){
         if( lineCount!=0 && lineCount+words[i].length>79){
              currentLine = turn80(currentLine); 
              newtext+=currentLine+'\n'; 
         	  currentLine =words[i];
         	  lineCount = words[i].length;
         }else{
           if(lineCount+words[i].length<80){
           	  currentLine = currentLine +' '+words[i];
           	  lineCount = currentLine.length;
           }else 
               if(lineCount==0 && words[i].length>80){
           	  		 newtext+= words[i]+'\n';  ; // i donnu . just in case smn speaks alien languages 
               } 
         }
    }
    //currentLine = turn80(currentLine);
    newtext+=currentLine+'\n'; 
    return newtext ; 


}



//the line normally should be under or equal to 80 
function turn80(line){
	 //console.log(line) ; 
	 line = line.trim(); // remove leading and last whitespaces :D 
     if(line.length>=80) return line; 
     let whitespace = 80 -line.length ;
     let i = 1 ;// the first letter is not a white space
     let nwline = line;   
     let sz = line.length , s =0 ; 
     while(whitespace>0 && i<line.length){
     	if(i==1){
     		line = nwline;
     	    nwline = ""; 
     	    nwline += line[0];
     	    s=1; 
     	}
        if(line[i]==' ' && whitespace>0){
        	nwline+=" ";
        	whitespace--; 
        	nwline+=" "; 	
        }else{
           nwline += line[i];
           s++;
        }
        // no whitespaces to add  
        if(whitespace==0){
           while(i<line.length-1){
               i++;   
           	   nwline += line[i];
           }
        }
        if(s==sz){
        	break;
        }
        if(i==line.length-1)i=1;   
        else i++;
        
    }
    return nwline ;
}