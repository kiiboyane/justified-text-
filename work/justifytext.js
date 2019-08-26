var justiftext = require("../work/justifytext.js");

module.exports.justifytext =function (text){
    text =remove(text)
    words = text.split(" ");
    let newtext = ""; 
    let lineCount = 0;
    let currentLine ="" ;
    for(let i=0 ;i<words.length; i++){
         if( lineCount!=0 && lineCount+words[i].length>79){
              currentLine = justiftext.turn80(currentLine); 
              newtext+=currentLine+'\n'; 
              currentLine =words[i];
              lineCount = words[i].length;
         }else{
           if(lineCount+words[i].length<80){
              if(currentLine === "")currentLine = words[i];
              else currentLine =  currentLine + " " +words[i];
              lineCount = currentLine.length;
           }else 
               if(lineCount==0 && words[i].length>80)
                   newtext+= words[i]+'\n';  ; // i donnu . just in case smn speaks alien languages 
         }
    }
    //currentLine = turn80(currentLine);
    newtext+=currentLine; 
    return newtext ; 
}
//removes additional white spaces 
function remove(text){
  text = text.replace(/\n/g," ");
  text = text.replace(/\r/g," ");
  text = text.replace(/\t/g," ");
  text = text.replace(/ {1,}/g," ");
  text = text.trim();
  return text  ;
}


//the line normally should be under or equal to 80 
 module.exports.turn80 =function(line){
   //console.log(line) ; 
   line = remove(line);
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