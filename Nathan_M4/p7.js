// summary.js

// Load player name
const playerName = localStorage.getItem("playerName");
if (playerName) {
    document.getElementById("playerName").textContent = playerName;
}

// Load final score
const finalScore = localStorage.getItem("finalScore");
if (finalScore) {
    document.getElementById("finalScore").textContent = finalScore;
}

// Load game result (Win/Lose)
const result = localStorage.getItem("result");
if (result) {
    document.getElementById("result").textContent = result;
}

// Navigate home
function goToHome() {
    window.location.href = "home.html";
}
