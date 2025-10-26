document.getElementById("openPopup").onclick = function () {
  document.getElementById("popup").style.display = "block";
};

document.getElementsByClassName("close")[0].onclick = function () {
  closePopup();
};

window.onclick = function (event) {
  if (event.target == document.getElementById("popup")) {
    closePopup();
  }
};

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

function sendFeedback() {
  alert("Feedback send!");
  closePopup();
}
