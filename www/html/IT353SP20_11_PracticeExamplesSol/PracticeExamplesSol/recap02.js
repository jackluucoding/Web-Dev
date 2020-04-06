var pics = [{name: "Kitty One",
file: "100.jpg"},
{name: "Kitty Two",
file: "103.jpg"},
{name: "Kitty three",
file: "102.jpg"}
];

function displayKitten(input){

    document.write('<figure>');
    document.write('<img src ="images/' + input.file + '" alt = "hello" >');
    document.write('<figcaption> ' + input.name+ ' </figcaption>');
    document.write('</figure>');

}

function multiply(number1,number2){
  return number1*number2;
}

function multiplyTable(rows, cols)
{
  var tableOut = "<table border='1' width='300' cellspacing='0' cellpadding='5'>";
  tableOut = tableOut + "<tr>";
  for (var j = 1; j<=cols;j++){
    tableOut = tableOut + "<th colspan ='2'>"  +j+ " </th>";
  }
  tableOut = tableOut + "</tr>";
  for(i=1;i<=rows;i++)
  {
    tableOut = tableOut + "<tr>";
    for (var j = 1; j<=cols;j++){
      tableOut = tableOut + "<td>" + i+ "x" + j+ "</td>";
      tableOut = tableOut + "<td>" + multiply(i,j) + "</td>";
    }
    tableOut = tableOut + "</tr>";
  }
  tableOut = tableOut + "</table>";
  document.write(tableOut);
}
