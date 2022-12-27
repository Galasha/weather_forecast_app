function openForecast(evt, forecast) {
  let i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace("active", "");
  }
  document.getElementById(forecast).style.display = "block";
  evt.currentTarget.className += "active";
}

document.getElementById("defaultOpen").click();

function openDetails() {
  let btnDetails = document.getElementById("btn_details");
  let btnContent = document.getElementById("btn_content");
  if (btnContent.style.display === "none") {
    btnContent.style.display = "block";
    btnDetails.innerHTML = "Show less <<<";
  } else {
    btnContent.style.display = "none";
    btnDetails.innerHTML = "Show more details >>>";
  }
}

let displayDetails = document.querySelector("#btn_details");
displayDetails.addEventListener("click", openDetails);
