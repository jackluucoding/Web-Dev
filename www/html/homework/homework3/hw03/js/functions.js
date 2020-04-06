/* Homework 03 - define functions here
Name: Jack Luu
Section: IT353-02
*/



function outputCartRow(file, title, quantity, price, total) {
  document.write('<tr>');
  document.write('<td><img src="images/' + file + '"></td>');
  document.write('<td>' +title + '</td>');
  document.write('<td>' +quantity + '</td>');
  document.write('<td>' +price.toFixed(2)+ '</td>');
  document.write('<td>' +total.toFixed(2) + '</td>');
  document.write('</tr>');
}

function calculateTotal(quantity, price) {
  return quantity*price;
}

function calculateTax(subtotal, rate) {
  return subtotal*rate;
}

function calculateShipping(subtotal, threshold){
  if (subtotal<threshold){
    return 40;
  }
  else{
    return 0;
  }
}

function calculateGrandTotal(subtotal,tax,shipping) {
  return subtotal + tax + shipping;
}


function outputCurrency(num){
  document.write(num.toFixed(2));
}
