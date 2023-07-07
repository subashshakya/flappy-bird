const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d");

canvas.height = 700;
canvas.width = 431;

//making images
const birdImage = new Image();
birdImage.src = "./img/bird.png";

const background = new Image();
background.src = "./img/background.png";

const pipeImage = new Image();
const invertedPipe = new Image();

pipeImage.src = "./img/toppipe.png";
invertedPipe.src = "./img/bottompipe.png";

let gamePlaying = false;

const gravity = 0.5,
  speed = 6.2,
  size = [50, 40],
  jump = -10,
  cTenth = canvas.width / 10;

let index = 0,
  bestScore = 0,
  flight,
  flyHeight,
  currentScore;

//////////////////////////////////////////////////////////////////////////////////////////
//---------------------------BIRD------------------------------------------------------//
////////////////////////////////////////////////////////////////////////////////////////

class Bird {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  drawBird() {
    ctx.drawImage(birdImage, this.x, this.y, this.width, this.height);
  }

  jump() {
    this.y += gravity;

    // this.y -= 10;
    this.drawBird();
  }
}

const bird = new Bird(100, 100, size[0], size[1]);

/////////////////////////////////////////////////////////////////////////////////////
//-----------------------PIPES-----------------------------------------------------/
///////////////////////////////////////////////////////////////////////////////////

// const PIPE_WIDTH = 50;
// const PIPE_GAP = 125;

// // Bird variables
// let birdX = 50;
// let birdY = 50;
// let birdVelocity = 0;
// let birdAcceleration = 0.1;

// // Pipe variables
let pipeX = 400;
let pipeY = canvas.height - 200;
const PIPE_WIDTH = 50;
const PIPE_GAP = 125;
let pipe;
let pipes = [];
let velocity = -3;

class Pipe {
  constructor(x, y, height, width, passed, pipeGap) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.pipeGap = pipeGap;
    this.passed = passed;
  }

  get pipeLocation() {
    return Math.random() * (canvas.height - (this.pipeGap + this.width));
  }

  renderPipe() {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.drawImage(pipeImage, this.x, this.y, this.width, this.height);
    ctx.drawImage(invertedPipe, this.x, this.y, this.width, this.height);
  }
}
let pipeGap = 270;

function placePipes() {
  let topPipe = new Pipe(pipeX, pipeY, PIPE_WIDTH, pipeY, false);

  pipes.push(topPipe);
}

// const pipeObj = new Pipe(canvas.width - 80, canvas.height - 300, 70, 400);
// pipes = Array(3)
//   .fill()
//   .map((arr, i) => {
//     canvas.width + i * pipeGap;
//   });

// let index = 0;
const render = () => {
  index++;

  //   ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.drawImage(
    background,
    0,
    0,
    canvas.width,
    canvas.height,
    -((index * (speed / 2)) % canvas.width) + canvas.width,
    0,
    canvas.width,
    canvas.height
  );

  ctx.drawImage(
    background,
    0,
    0,
    canvas.width,
    canvas.height,
    -((index * (speed / 2)) % canvas.width),
    0,
    canvas.width,
    canvas.height
  );
  //   ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (gamePlaying) {
    // bird.jump();
    window.addEventListener("keydown", (e) => {
      if (e.code === "Space") {
        bird.y -= 10;
        bird.drawBird();
      } else {
        bird.jump();
      }
    });
  } else {
    // ctx.drawImage(birdImage, 100, 100, 100, 100);
    bird.drawBird();
    ctx.fillText("Press Space To Play", 50, 500);
    ctx.font = "bold 30px monospace";
    // pipeObj.renderPipe();
  }

  for (let i = 0; i < pipes.length; i++) {
    let pipe = pipes[i];
    pipe.x += velocity;
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.drawImage(invertedPipe, pipe.x, pipe.y, pipe.width, pipe.height);
  }

  setInterval(placePipes, 1500);
  window.requestAnimationFrame(render);
};

render();
console.log("working");

window.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    gamePlaying = true;
    bird.jump();
  }
});
