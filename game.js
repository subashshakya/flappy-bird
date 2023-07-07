const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const gameContainer = document.getElementById("game-container");

const flappyImg = new Image();
flappyImg.src = "./img/bird.png";

const point = new Audio();
point.src = "./sounds/point.mp3";

const die = new Audio();
die.src = "./sounds/die.mp3";

//Game constants
const FLAP_SPEED = -3;
const BIRD_WIDTH = 40;
const BIRD_HEIGHT = 30;
const PIPE_WIDTH = 50;
const PIPE_GAP = 125;

// Bird variables
let birdX = 50;
let birdY = 50;
let birdVelocity = 0;
let birdAcceleration = 0.5;

// Pipe variables
let pipeX = 400;
let pipeY = canvas.height - 200;

// score and highscore variables
let scoreDiv = document.getElementById("score-display");
let score = 0;
let highScore = 0;

let scored = false;

document.body.onkeyup = function (e) {
  if (e.code == "Space") {
    birdVelocity = FLAP_SPEED;
  }
};

document
  .getElementById("restart-button")
  .addEventListener("click", function () {
    hideEndMenu();
    resetGame();
    loop();
  });

function increaseScore() {
  if (
    birdX > pipeX + PIPE_WIDTH &&
    (birdY < pipeY + PIPE_GAP || birdY + BIRD_HEIGHT > pipeY + PIPE_GAP) &&
    !scored
  ) {
    score++;
    scoreDiv.innerHTML = `Current Score: ${score}`;
    scored = true;
    point.play();
  }

  if (birdX < pipeX + PIPE_WIDTH) {
    scored = false;
  }
}

function collisionCheck() {
  const birdBox = {
    x: birdX,
    y: birdY,
    width: BIRD_WIDTH,
    height: BIRD_HEIGHT,
  };

  const topPipeBox = {
    x: pipeX,
    y: pipeY - PIPE_GAP + BIRD_HEIGHT,
    width: PIPE_WIDTH,
    height: pipeY,
  };

  const bottomPipeBox = {
    x: pipeX,
    y: pipeY + PIPE_GAP + BIRD_HEIGHT,
    width: PIPE_WIDTH,
    height: canvas.height - pipeY - PIPE_GAP,
  };

  // Check for collision with upper pipe box
  if (
    birdBox.x + birdBox.width > topPipeBox.x &&
    birdBox.x < topPipeBox.x + topPipeBox.width &&
    birdBox.y < topPipeBox.y
  ) {
    die.play();
    return true;
  }

  // Check for collision with lower pipe box
  if (
    birdBox.x + birdBox.width > bottomPipeBox.x &&
    birdBox.x < bottomPipeBox.x + bottomPipeBox.width &&
    birdBox.y + birdBox.height > bottomPipeBox.y
  ) {
    die.play();
    return true;
  }

  // check if bird hits boundaries
  if (birdY < 0 || birdY + BIRD_HEIGHT > canvas.height) {
    die.play();
    return true;
  }

  return false;
}

function hideEndMenu() {
  document.getElementById("end-menu").style.display = "none";
  gameContainer.classList.remove("backdrop-blur");
}

function showEndMenu() {
  document.getElementById("end-menu").style.display = "block";
  gameContainer.classList.add("backdrop-blur");
  document.getElementById("end-score").innerHTML = score;

  if (highScore < score) {
    highScore = score;
  }
  document.getElementById("best-score").innerHTML = highScore;
}

function resetGame() {
  birdX = 50;
  birdY = 50;
  birdVelocity = 0;
  birdAcceleration = 0.1;

  pipeX = 400;
  pipeY = canvas.height - 200;

  score = 0;
}

function endGame() {
  showEndMenu();
}

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw Flappy Bird
  ctx.drawImage(flappyImg, birdX, birdY, 40, 30);

  // Draw Pipes
  ctx.fillStyle = "#333";
  ctx.fillRect(pipeX, -50, PIPE_WIDTH, pipeY); // improves the accuracy of the upper column against collision
  ctx.fillRect(pipeX, pipeY + PIPE_GAP, PIPE_WIDTH, canvas.height - pipeY);

  if (collisionCheck()) {
    endGame();
    return;
  }

  pipeX -= 1.5;

  if (pipeX < -50) {
    pipeX = 400;
    pipeY = Math.random() * (canvas.height - PIPE_GAP) + PIPE_WIDTH;
  }

  birdVelocity += birdAcceleration;
  birdY += birdVelocity;

  increaseScore();
  requestAnimationFrame(loop);
}

loop();
