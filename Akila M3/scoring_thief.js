let score = 0;

const player = document.getElementById("player");
const scoreText = document.getElementById("score");

// Player starting position
let x = 135;
let y = 135;

document.addEventListener("keydown", function (event) {

  // Movement with arrow keys
  if (event.key === "ArrowUp") {
    y -= 10;
    increaseScore();
  }
  if (event.key === "ArrowDown") {
    y += 10;
    increaseScore();
  }
  if (event.key === "ArrowLeft") {
    x -= 10;
    increaseScore();
  }
  if (event.key === "ArrowRight") {
    x += 10;
    increaseScore();
  }

  // Update player position
  player.style.top = y + "px";
  player.style.left = x + "px";
});

// Score +10 for every movement
function increaseScore() {
  score += 10;
  scoreText.textContent = "Score: " + score;
}
