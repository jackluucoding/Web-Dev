window.addEventListener("load", function(){
  var  hilightableNode= document.getElementsByClassName('hilightable');
  for (i=0; i<hilightableNode.length; i++){
    hilightableNode[i].addEventListener("focus", setBackground);
    hilightableNode[i].addEventListener("blur", setBackground);
  }
//handling empty fields
document.getElementById('mainForm').addEventListener('submit', function(e){
  var required = document.getElementById('mainForm').getElementsByClassName('required hilightable');
  for(var j=0; j< required.length; j++){
    if(required[j].value==""){
      e.preventDefault();
      required[j].style.border = "1px solid red";
      required[j].classList.add("error");
      required[j].focus();
    }else{
//remove error CSS class
      if(required[j].value!=""){
        required[j].classList.remove("error");
      }

    }
  }})
});

//change background color when click on
function setBackground(e){
 if (e.type == "focus"){
 e.target.style.backgroundColor = "#FFE393";
}
 else if (e.type == "blur"){
 e.target.style.backgroundColor = "white";
}
}
