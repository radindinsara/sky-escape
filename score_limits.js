//THIEF PAGE
let thiefScore = 0;

const thiefScoreText = document.getElementById("thief-score");
const thiefInput = document.getElementById("thiefInput");

// Only run thief logic if elements exist
if (thiefScoreText && thiefInput) {

  function submitThief() {
    thiefScore += 10;

    if (thiefScore > 250) thiefScore = 250;
    if (thiefScore < 0) thiefScore = 0;

    thiefScoreText.textContent = "Score: " + thiefScore;

    thiefInput.value = "";
    thiefInput.focus();
  }

  thiefInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") submitThief();
  });
}


// POLICE
let policeScore = 250;

const policeScoreText = document.getElementById("police-score");
const policeInput = document.getElementById("policeInput");

// Only run police logic if elements exist
if (policeScoreText && policeInput) {

  function submitPolice() {
    policeScore -= 10;

    if (policeScore > 250) policeScore = 250;
    if (policeScore < 0) policeScore = 0;

    policeScoreText.textContent = "Score: " + policeScore;

    policeInput.value = "";
    policeInput.focus();
  }

  policeInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") submitPolice();
  });
}
