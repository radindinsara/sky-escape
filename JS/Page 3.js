// This shows Page 3 (Role Info Page)
function loadRoleInfo() {
    let name = localStorage.getItem("playerName");
    let role = localStorage.getItem("playerRole");

    // Set the title
    document.getElementById("roleTitle").innerText =
        role.toUpperCase() + " Instructions";

    // Change description based on role
    if (role === "thief") {
        document.getElementById("roleDescription").innerText =
            "Hello " + name + "! As the Thief, your goal is to escape by choosing airports carefully.";
    } else {
        document.getElementById("roleDescription").innerText =
            "Hello " + name + "! As the Police, your goal is to catch the thief by predicting their moves.";
    }
}

// Moves from page 3 to page 4
document.getElementById("startGameBtn").onclick = function () {
    showPage(4);
    loadGameLayout();
};

// Loads role, time and score on Page 4
function loadGameLayout() {
    let role = localStorage.getItem("playerRole");

    document.getElementById("headerRole").innerText = role;
    document.getElementById("headerTime").innerText = 120; // placeholder
    document.getElementById("headerScore").innerText = 0;  // placeholder
}

// When the user clicks "Go"
document.getElementById("goBtn").onclick = function () {
    let airport = document.getElementById("airportInput").value;

    // Basic check
    if (airport === "") {
        return;
    }

    // Add message to log
    let logBox = document.getElementById("gameLog");
    logBox.innerHTML += "<p>You selected: <b>" + airport + "</b></p>";

    // Clear input
    document.getElementById("airportInput").value = "";
};