var nurl=`${window.location.href}`;
      var rurl= new URL(nurl);
      var did=rurl.searchParams.get("id");
console.log(did);
var c=1;


var hjcordiref= firebase.database().ref(`tweets/${did}`).limitToFirst(100);
     hjcordiref.orderByChild("date").on("child_added", function(data){
          var newVoke= data.val();
        var post=document.getElementById("dpost")
        c++;
         var pcost = "";
         pcost+=`<div id=dpi${c} class="col-lg-4 col-sm-12 mt-4">
      
      <div class="card-body"  style="background-color: aliceblue">
          
        <h5 class="card-field card-title" style="font-weight:700;"> <i class="fab fa-twitter"></i> Tweet <br>${newVoke.created_at}</h5>
        <p class="card-text">${newVoke.text}</p>
     <br>
<p class="text-muted">@${newVoke.username}</p>
          
          <br><br>
      </div>
    </div>`
          post.innerHTML += pcost;
          });
document.querySelector('#allbtn').onclick = function(){
           document.getElementById("loader").style.display="block";
var allhjcordiref= firebase.database().ref(`tweets/${did}`);
     allhjcordiref.orderByChild("date").on("child_added", function(data){
          var newVoke= data.val();
         document.write(`<div class="col-lg-4 col-sm-12 mt-4">
      
      <div class="card-body"  style="background-color: aliceblue">
          
        <h5 class="card-field card-title" style="font-weight:700;"> <i class="fab fa-twitter"></i> Tweet <br>${newVoke.created_at}</h5>
        <p class="card-text">${newVoke.text}</p>
     <br>
<p class="text-muted">@${newVoke.username}</p>
          
          <br><br>
      </div>
    </div>`);
       
          });
}

var chk=setInterval(function(){
    if(document.getElementById("dpi101")){
        document.getElementById("loader").style.display="none";
        clearInterval(chk);
    }
},500);