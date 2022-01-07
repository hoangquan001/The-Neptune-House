document.getElementById("new").addEventListener("click", myFunction);
function myFunction() {
  var x = document.getElementById("NewHospital");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}