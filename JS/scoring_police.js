let policeScore = 250;

const policeScoreText = document.getElementById("police-score");
const policeInput = document.getElementById("policeInput");

// When user presses button or Enter key
function submitPoliceNumber() {
  let num = policeInput.value; // user input (not used)

  policeScore -= 10; // -10 every entry
  policeScoreText.textContent = "Score: " + policeScore;

  policeInput.value = ""; // clear input
  policeInput.focus(); // focus again
}

policeInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    submitPoliceNumber();
  }
});
