// PAGE SWITCH
function showPage(num){
    document.getElementById("page3").style.display = "none";
    document.getElementById("page4").style.display = "none";
    if(num===3) document.getElementById("page3").style.display = "block";
    if(num===4) document.getElementById("page4").style.display = "block";
}

// LOAD ROLE INSTRUCTIONS
function loadRoleInstructions(){
    let role = localStorage.getItem("playerRole") || "thief";
    const selectedRole = document.getElementById("selectedRole");
    const instructions = document.getElementById("roleInstructions");

    if(role === "police"){
        selectedRole.innerText = "You have selected Police";
        instructions.innerHTML = `
            - Catch the thief.<br>
            - 120 seconds total.<br>
            - Start with 250 points.<br>
            - Predict thief's moves carefully.
        `;
    } else {
        selectedRole.innerText = "You have selected Thief";
        instructions.innerHTML = `
            - Escape from police.<br>
            - 120 seconds total.<br>
            - Start with 0 points.<br>
            - Gain 10 points each new airport.
        `;
    }

    document.getElementById("headerScore").innerText = role==="police"?250:0;
}

// LOAD AIRPORTS (NUMBERED)
function loadGameLayout(){
    let airports = ["JFK","LAX","ORD","ATL","DFW","DEN","SFO","SEA","MIA","BOS","LAS","PHX","IAH","MSP","CLT"];
    const airportList = document.getElementById("airportList");
    airportList.innerHTML = "";
    airports.forEach((code,index)=>{
        let li = document.createElement("li");
        li.innerText = `${index+1}. ${code}`;
        airportList.appendChild(li);
    });
}

// START BUTTON
document.getElementById("startGameBtn").onclick = function(){
    showPage(4);
    loadGameLayout();
}

// GO BUTTON – only allow numbers
document.getElementById("goBtn").onclick = function(){
    let input = document.getElementById("airportInput");
    let num = parseInt(input.value);
    if(isNaN(num) || num<1 || num>15){
        alert("Enter a number between 1 and 15!");
        input.value="";
        return;
    }
    input.value="";
}

// ON PAGE LOAD
window.onload = function(){
    showPage(3);
    loadRoleInstructions();
}
