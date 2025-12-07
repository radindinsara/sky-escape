var playerName = "";

function startGame() {
    playerName = document.getElementById("nameInput").value.trim();

    if (playerName === "") {
        alert("Please enter your name!");
        return;
    }
    else{
        window.location.href = "role_selection.html";
        sessionStorage.setItem("PlayerName", playerName);
    }
    console.log("Game starting for:", playerName);
}

// ENTER key
document.getElementById("nameInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        startGame();
    }
});
