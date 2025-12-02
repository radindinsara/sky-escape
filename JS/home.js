var playerName = "";

function startGame() {
    playerName = document.getElementById("nameInput").value;

    if(playerName == "") {
        alert("Please enter your name!");
        return;
    }

    alert("Welcome to SKY HEIST, " + playerName + "!");
}