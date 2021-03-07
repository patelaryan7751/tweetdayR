var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var tdd = String(today.getDate() + 1).padStart(2, "0");
var ydd = String(today.getDate() - 1).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0");
var yyyy = today.getFullYear();
today = ydd + "-" + mm + "-" + yyyy;
document.getElementById("dyn").textContent = `Do not choose dates after ${today}`;
document.querySelector("#sbtn").onclick = function () {
    var dti = document.getElementById("dt").value.split("-").join("");
    console.log(dti);
    url = `https://patelaryan7751.github.io/tweetdayR/frontend/tweet.html?id=${dti}`;
    console.log(url);
    document.getElementById("tbtn").style.display = "block";
};
document.querySelector("#tbtn").onclick = function () {
    window.open(`${url}`, "_self");
};
