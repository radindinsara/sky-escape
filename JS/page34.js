// PAGE SWITCH
function showPage(num){
    document.getElementById("page3").style.display = "none";
    document.getElementById("page4").style.display = "none";
    if(num===3) document.getElementById("page3").style.display = "block";
    if(num===4) document.getElementById("page4").style.display = "block";
}

// LOAD ROLE INSTRUCTIONS
function loadRoleInstructions(){
    let role = sessionStorage.getItem("playerRole") || "thief";
    const selectedRole = document.getElementById("selectedRole");
    const instructions = document.getElementById("roleInstructions");

    if(role === "Police"){
        selectedRole.innerText = "You have selected Police";
        instructions.innerHTML = `
            - Your Goal is to catch the Thief.<br>
            - You have 120 second or 2 Minutes to do so.<br>
            - Initially you tart with 250 points.<br>
            - And points go down by 10 everytime you fail to catch the thief.<br>
            - Predict thief's moves carefully and good luck.
        `;
    } else {
        selectedRole.innerText = "You have selected Thief";
        instructions.innerHTML = `
            - Your goal is to escape from police.<br>
            - You have 120 second or 2 Minutes to do so.<br>
            - Initially you start with 0 points.<br>
            - Gain 10 points each time you go to a new airport and evade the police.<br>
            - Be careful try to predict the Police Moves .<br>
        `;
    }


}

// LOAD AIRPORTS (NUMBERED)
async function loadGameLayout(){

    document.getElementById("headerRole").innerText = sessionStorage.getItem("playerRole");
    document.getElementById("headerScore").innerText = (sessionStorage.getItem("playerRole"))==="Police"?250:0;

    const res = await fetch("http://127.0.0.1:5000/api/airports");
    const data = await res.json();
    console.log("Airports API response:", data);
    let airports = [];
    if (Array.isArray(data)) {
      airports = data;
    } else if (Array.isArray(data.airports)) {
      airports = data.airports;
    } else {
      console.error("Unexpected airports response shape:", data);
    }

    sessionStorage.setItem("AirPortList",airports);

    const airportList = document.getElementById("airportList");
    airportList.innerHTML = "";
    airports.forEach((code,index)=>{
        let li = document.createElement("li");
        li.innerText = `${index+1}. ${code.name} - ${code.ident}`;
        li.dataset.ident = code.ident;
        airportList.appendChild(li);
    });

    const randomAirport = airports[Math.floor(Math.random() * airports.length)];

    sessionStorage.setItem("RandomAirport", JSON.stringify(randomAirport));

    let goldenAirport = airports[Math.floor(Math.random() * airports.length)];

    if (goldenAirport.ident === randomAirport.ident) {

    goldenAirport = airports[Math.floor(Math.random() * airports.length)];
    }

    sessionStorage.setItem("GoldenAirport", JSON.stringify(goldenAirport));


}

// START BUTTON
document.getElementById("startGameBtn").onclick = function(){
    showPage(4);
    loadGameLayout();
}
// GO BUTTON – only allow numbers
document.getElementById("goBtn").onclick = function(){

   // Start timer first time GO is clicked
    startTimer();

    let input = document.getElementById("airportInput");
    let num = parseInt(input.value);
    const items = document.querySelectorAll("#airportList li");

    if (isNaN(num) || num < 1 || num > items.length) {
        input.value = "";
        return;
    }

    const selected = items[num - 1];
    const randomAirport = JSON.parse(sessionStorage.getItem("RandomAirport"));
    const goldenAirport = JSON.parse(sessionStorage.getItem("GoldenAirport"));

    const goldenPopup = document.getElementById("goldenPopup");
    const closePopup = document.getElementById("closePopup");


    if (selected.classList.contains("used")) {
        alert("You already used this airport!");
        input.value = "";
        return;
    }

    const ident = selected.dataset.ident;

    closePopup.onclick = () => {
    goldenPopup.style.display = "none";
    };


    if(goldenAirport.ident === ident){

        updateScoreGolden();
        goldenPopup.style.display = "flex";
    }


    if (ident === randomAirport.ident) {
         window.location.href="Nathan_M4/P7.html";
    }

    sessionStorage.setItem("AirPortSelected", ident);

     selected.classList.add("used");
    // Update score based on role


    input.value="";
    updateScore();

}

let timerStarted =false;
let timerInterval=null;
let timeLeft = 120;

function startTimer() {
    if (timerStarted) return; // prevent starting again

    timerStarted = true;

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("headerTime").innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("⏳ Time's up!");
        }
    }, 1000);
}

function updateScore() {
     let role = sessionStorage.getItem("playerRole") || "thief";
     let score = parseInt(document.getElementById("headerScore").innerText);
    if (role === "Police") {
        score -= 10;
    } else if (role === "Thief") {
        score += 10;
    }
    document.getElementById("headerScore").innerText = score;
}

function updateScoreGolden() {
     let role = sessionStorage.getItem("playerRole") || "thief";
     let score = parseInt(document.getElementById("headerScore").innerText);
     score +=5;
    document.getElementById("headerScore").innerText = score;
}


// ON PAGE LOAD
window.onload = function(){
    showPage(3);
    loadRoleInstructions();
}
