<?php
function compute($number1, $number2, $operator){
  if($operator == "+"){
    return $number1 + $number2;
  }
  else if($operator == "-"){
    return $number1 - $number2;
  }
  else if($operator == "/"){
    return $number1 / $number2;
  }
  else if($operator == "*"){
    return $number1 * $number2;
  }
  else{
    return -1;
  }
}

function greetings(){
  $timeOfDay = date('H')-5;

  if($timeOfDay < 12){
    return "Good morning";
  }
  else if($timeOfDay > 12 && $timeOfDay < 18){
    return "Good afternoon";
  }
  else if($timeOfDay >= 18){
    return "Good evening";
  }
  else{
    return "Welcome";
  }
}
?>
