function search(){
    var usersearchkeyword =   document.getElementById('input').value;
    var url="https://pixabay.com/api/?";
    var data="key=16032234-3746ac94c2a441380a5ba253e&image_type=photo&q="+usersearchkeyword;

    $.get(url,data).done(function(response){
     $("#searchButton").click(function(){
      $("div").empty();
     });

      for(var i=0; i<response.hits.length; i++){
        var imgdiv = $('<div> </div>');
        imgdiv.attr("class","imgdiv");
        //$("#photos").append('<div></div>');

        imgdiv.append('<img src="'+response.hits[i].previewURL +'"alt="flowers" />');
        imgdiv.append('<p> Likes:' +response.hits[i].likes+ '</p>');
        $("#photos").append(imgdiv);
        // $(".imgdiv").append('<img src="'+response.hits[i].previewURL +'"alt="flowers" />');
        // $(".imgdiv").append('<p> Likes:' +response.hits[i].likes+ '</p>');
        // $("#photos").append($(".imgdiv"));
      }
      }
    );

    }

$(document).ready(function(){
  $("#searchButton").on("click",search);
});
