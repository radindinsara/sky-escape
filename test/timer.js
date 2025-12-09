let timeLeft = 120;
let timerStarted = false;  // start only once

let timerDisplay = document.getElementById("timer");
let playerInput = document.getElementById("playerInput");

playerInput.addEventListener("keydown", function(event) {

  if (event.key === "Enter") {

    if (timerStarted === false) {
      timerStarted = true;

      let timer = setInterval(function() {

        timeLeft = timeLeft - 1;

        // Stop timer
        if (timeLeft <= 0) {
          clearInterval(timer);
          timerDisplay.textContent = "TIME UP!";
          return; // stop running this code
        }

        // calculate time
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;

        if (seconds < 10) {
          seconds = "0" + seconds;
        }

        timerDisplay.textContent = minutes + ":" + seconds;

      }, 1000);
    }

    playerInput.value = "";
  }
});
