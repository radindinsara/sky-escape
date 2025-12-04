var playerName = "";

function startGame() {
    playerName = document.getElementById("nameInput").value.trim();

    if (playerName === "") {
        alert("Please enter your name!");
        return;
    }
    console.log("Game starting for:", playerName);
}

// ENTER key
document.getElementById("nameInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        startGame();
    }
});
