

var book = [
  {title:"Fundamentals of Web Development",
  authors: [{firstName: "Arthur", lastName:"Keown"},
           {firstName: "John", lastName: "Martin"}]
         },
  {title:"Data Structure",
  authors: [{firstName: "Mark", lastName:"Weiss"},
            {firstName: "Alice", lastName: "Martin"}]}
       ] ;




function myfunction(){
  for(i = 0; i <=book.length; i++)
  {
    var barray=book.length;
    document.write("<h2>"+book[i].title+"</h2>");
    for(j=0; j<barray; j++)
    {
      document.write("<p>"+book[i].authors[j].firstName," ",book[i].authors[j].lastName);
    }
  }
}

document.write(myfunction());


// function myfunction(){
//   var i;
//   for(i=0; i<book.length;i++){
//     document.write("<h2>"+ book[i].title +  "</h2>" + "<br>");
//     document.write(book[i].authors[i].firstName + " ");
//     document.write(book[i].authors[i].lastName + "<br>");
//   }
// }
