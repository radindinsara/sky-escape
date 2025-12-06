let timeLeft = 120;      // 2 minutes in seconds
let timerStarted = false; // to make sure timer starts only once

let timerDisplay = document.getElementById("timer");
let playerInput = document.getElementById("playerInput");

playerInput.addEventListener("keydown", function(event) {

  if (event.key === "Enter") {

    // start timer only first time
    if (timerStarted === false) {
      timerStarted = true;

      // run every 1 second
      setInterval(function() {

        // reduce time
        timeLeft = timeLeft - 1;

        // calculate minutes and seconds
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;

        // add a 0 in front of numbers below 10
        if (seconds < 10) {
          seconds = "0" + seconds;
        }

        // update the timer display
        timerDisplay.textContent = minutes + ":" + seconds;

        // stop at zero
        if (timeLeft <= 0) {
          timerDisplay.textContent = "TIME UP!";
        }

      }, 1000);
    }

    // clear input
    playerInput.value = "";
  }
});
