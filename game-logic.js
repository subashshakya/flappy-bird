"use strict";

const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d");

let gamePlaying = false;
let gameRunning = false;
let gravity = 0.5,
  speed = 6.5,
  jump = -11.5,
  size = [];

canvas.height = 700;
canvas.width = 500;

////////////////////////////////////////////////////////////////
//---------------BIRD----------------------------------------//
//////////////////////////////////////////////////////////////
const birdImg = new Image();
birdImg.src = "./img/bird.png";

//bird positions
const birdHeight = 50;
const birdWidth = 50;

class Bird {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  drawBird() {
    ctx.drawImage(birdImg, this.x, this.y, this.width, this.height);
  }
}

ctx.fillText("PRESS SPACE TO START", canvas.width / 2, canvas.height / 2);

const bird = new Bird(400, 400, birdWidth, birdHeight);

bird.drawBird();
// ctx.drawImage(birdImg, 300, 300, 300, 100);

/////////////////////////////////////////////////////////////
// -----------------PIPES----------------------------------//
/////////////////////////////////////////////////////////////
let pipeArr = [];
let pipeHeight = 300;
let pipeWidth = 70;
let pipeX = canvas.width - 100;
let pipeY = 0;
let velocity = -2;
const pipeStr = new Image();
const pipeInv = new Image();

// img/set.png
pipeStr.src = "img/pipe-2.jpeg";
pipeInv.src = "./pipe-i.jpg";

console.log(pipeStr);
class Pipe {
  constructor(x, y, height, width, passed) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.passed = passed;
  }

  renderPipe() {
    ctx.drawImage(pipeStr, this.x, this.y, this.width, this.height);
  }

  // pipePlacement{

  // }
}

const pipe = new Pipe(pipeX, pipeY, pipeWidth, pipeHeight, false);
pipe.renderPipe();

function update() {
  requestAnimationFrame(update);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    birdImg,
    canvas.width / 2,
    canvas.height / 2,
    bird.width,
    bird.height
  );

  ctx.drawImage(pipeStr, pipe.x, pipe.y + 350, pipe.width, pipe.height);

  for (let i = 0; i < pipeArr.length; i++) {
    let pipes = pipeArr[i];
  }
}

update();
// setInterval(pipePlacement, 1500);

///////////////////////////////////////////////////////////////
// --------------------------GAME---------------------------//
/////////////////////////////////////////////////////////////
