/* Homework 03
Name:
Section:
add loop and other code here ... */

/* using constant, can also use var if using old browser*/
const tax_rate = 0.10;
const shipping_threshold = 1000;

/* running total for subtotals */
var subtotal = 0;
var tax = 0;
var shipping = 0;
var grand = 0;



//function outputCartRow(file, title, quantity, price, total) {

for (i=0; i<filenames.length; i++){
var total;
total = calculateTotal(quantities[i], prices[i]);
subtotal += total;
outputCartRow(filenames[i], titles[i], quantities[i], prices[i], total);
}

tax = calculateTax(subtotal, tax_rate);
shipping = calculateShipping(subtotal, shipping_threshold);
grand = calculateGrandTotal(subtotal,tax,shipping);
