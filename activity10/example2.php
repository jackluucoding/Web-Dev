<?php include 'functions.inc.php' ?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>

    <header>
      <h1> Processing form inout with PHP </h1>
    </header>

    <h2> Welcome <?php echo $_GET['user'] ?> </h2>

<div id ="compute">
  Your lucky number is: <?php echo compute($_GET['num1'],$_GET['num2']); ?>

  </body>
</html>
