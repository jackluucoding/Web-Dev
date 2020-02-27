/* Greetings Example */
function greetings() {

  // document.write("Hello! Welcome to the website");
  var hourOfDay = new Date().getHours();
  var greeting;



  if(hourOfDay > 4 && hourOfDay < 12){
    greeting = document.write("Good morning");
  } else if (hourOfDay >=12 && hourOfDay <18){
    greeting = document.write("Good afternoon");
  }else {
    greeting = document.write("Good Evening");
  }

}


function multiply(number1,number2){

  return number1*number2;

}

function add(number1,number2){

  return number1+number2;

}

function createTable(rows, cols){
  document.write("<table border='1' width='300' cellspacing='0' cellpadding='5'>");
   for(var i=0; i<rows; i++){
     document.write("<tr>");
     for( var j=0; j<cols; j++){
       document.write("<td>" +i +j+ "</td>");
     }
     document.write("</tr>");
   }

  document.write("</table>")

}
