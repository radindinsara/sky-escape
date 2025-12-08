// summary.js

// Load player name
const playerName = sessionStorage.getItem("PlayerName");
if (playerName) {
    document.getElementById("playerName").textContent = playerName;
}

// Load final score
const finalScore = sessionStorage.getItem("FinalScore");
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
    window.location.href = "../home.html";
}


function UpdateList(){
    let role = sessionStorage.getItem("playerRole");

   if (role === "Police")
   {
       document.getElementById("result").textContent = "Win";

    }
   else if (role === "Thief")
    {
        if(finalScore >=50){
             document.getElementById("result").textContent = "Win";
        }
        else
        {
             document.getElementById("result").textContent = "Loose";
        }

    }
}


UpdateList();