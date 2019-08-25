const express = require('express');
const stringLength = require('string-length');
const router = express.Router(); 


router.post('/justify' , function(req , res , next){
    res.set('Content-Type', 'text/plain');// this is for the whitespaces , if u remove it, this happens "a      f" is equal to "a f"
    // test 
    let txt = justifytext(req.body); 
	res.send(txt); 
    // test 
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
    currentLine = turn80(currentLine);
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