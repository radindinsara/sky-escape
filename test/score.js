// =============================
// THIEF LOGIC (if thief IDs exist)
// =============================
const thiefScoreText = document.getElementById("thief-score");
const thiefInput = document.getElementById("thiefInput");

let thiefScore = 0;

if (thiefScoreText && thiefInput) {
  thiefInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {

      thiefScore += 10;

      thiefScoreText.textContent = "Score: " + thiefScore;

      thiefInput.value = "";
    }
  });
}



// POLICE

const policeScoreText = document.getElementById("police-score");
const policeInput = document.getElementById("policeInput");

let policeScore = 250;

if (policeScoreText && policeInput) {
  policeInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {

      policeScore -= 10;

      policeScoreText.textContent = "Score: " + policeScore;

      policeInput.value = "";
    }
  });
}
