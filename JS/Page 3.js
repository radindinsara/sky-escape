// This shows Page 3 (Role Info Page)
function loadRoleInfo() {
    let name = localStorage.getItem("playerName");
    let role = localStorage.getItem("playerRole");

    // Set the title
    document.getElementById("roleTitle").innerText =
        role.toUpperCase() + " Instructions";