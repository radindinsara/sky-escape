
document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("playerNameDisplay").textContent = sessionStorage.getItem("PlayerName") || "Player";


    document.getElementById("thiefBtn").addEventListener("click", function () {
        sessionStorage.setItem("playerRole","Thief");
        window.location.href = "page3.html";
    });

    document.getElementById("policeBtn").addEventListener("click", function () {
        sessionStorage.setItem("playerRole","Police");
        window.location.href = "page3.html";
    });

});


