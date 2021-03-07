var today = new Date();
              var dd= String(today.getDate()).padStart(2,'0');
              var tdd= String(today.getDate()+1).padStart(2,'0');
              var ydd= String(today.getDate()-1).padStart(2,'0');
              var mm = String(today.getMonth() +1).padStart(2,'0');
              var yyyy= today.getFullYear();
              today=yyyy+'-'+mm+'-'+dd;
              serdat=yyyy+mm+ydd;
              tomorrow=yyyy+'-'+mm+'-'+tdd;
              yesterday=yyyy+'-'+mm+'-'+ydd;
document.querySelector('#sbtn').onclick = function(){
    
    var dti=document.getElementById("dt").value.split("-").join("");
    console.log(dti);
     url=`https://patelaryan7751.github.io/tweetdayR/frontend/tweet.html?id=${dti}`
    console.log(url);
    document.getElementById("tbtn").style.display="block";
    
    }
document.querySelector('#tbtn').onclick = function(){
    window.open(`${url}`,'_self')
}


/*var hjcordiref= firebase.database().ref(`tweets/`);
     hjcordiref.on("value", function(data){
         console.log(data.val());
          var newVoke= data.val();
         
        var post=document.getElementById("dpost")
         var pcost = "";
         pcost+=`<div class="col-lg-4 col-sm-12 mt-4">
      
      <div class="card-body"  style="background-color: aliceblue">
          
        <h5 class="card-field card-title" style="font-weight:700;"> <i class="fab fa-twitter"></i> Tweets${newVoke}</h5>
        <p class="card-text">All Tweets containing #rstats</p>
           <a  href="" class="btn btn-primary" style="display: inline-block">View</a>
          <br><br>
      </div>
    </div>`
          post.innerHTML += pcost;
          });*/