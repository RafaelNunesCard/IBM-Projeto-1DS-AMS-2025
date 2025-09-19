function openPopup() {
  document.getElementById("popup").style.display = "block";
  document.getElementById("overlay").style.display = "block";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

function setStatus() {
  const status = document.getElementById("status").value;
  const availability = document.querySelector(
    'input[name="availability"]:checked'
  ).value;
  alert(`Status: ${status}, Availability: ${availability}`);
  closePopup();
}
