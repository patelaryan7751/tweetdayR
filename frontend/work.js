var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var tdd = String(today.getDate() + 1).padStart(2, "0");
var ydd = String(today.getDate() - 1).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0");
var yyyy = today.getFullYear();
yesterday = ydd + "-" + mm + "-" + yyyy;
ysef= yyyy+ "-" + mm + "-" + ydd;
document.getElementById("dyn").textContent = `Do not choose dates after ${yesterday} .  ${yesterday} this date can be choosen`;
document.querySelector("#sbtn").onclick = function () {
    var dti = document.getElementById("dt").value.split("-").join("");
    console.log(dti);
    url = `https://patelaryan7751.github.io/tweetdayR/frontend/tweet.html?id=${dti}`;
    console.log(url);
    if(dti){
        var x= new Date('2021-03-05');
        var y=new Date(`${ysef}`);
        var z=new Date(`${document.getElementById("dt").value}`);
       if(x<=z && z<=y){
           console.log("true")
           document.getElementById("val").style.display = "none";
            document.getElementById("tbtn").style.display = "block";
       }
        else{
            document.getElementById("val").style.display = "block";
             document.getElementById("tbtn").style.display = "none";
            console.log("false")
        }
   
    }
    else{
         document.getElementById("val").style.display = "block";
        document.getElementById("tbtn").style.display = "none";
    }
};
document.querySelector("#tbtn").onclick = function () {
    window.open(`${url}`, "_self");
};
