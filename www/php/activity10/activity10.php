<?php include 'functions.inc.php' ?>
<html>
<body>
  <header>
    <h1> Processing form input with PHP </h1>
  </header>
  <div id = "main">
    <h2> <?php echo greetings(); ?> <?php echo $_GET['user']?> </h2>
  </div>
  <div id = "compute">
    Your lucky number is: <?php echo compute($_GET['number1'],$_GET['number2'],$_GET['operator']); ?>
  </div>

</body>
<?php include 'footer.inc.php' ?>
</html>
