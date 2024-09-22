let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let highestScore = 0;

let body = document.querySelector("body");
let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");
let container = document.querySelector(".btn-container");
let circle = document.querySelector("#text");
let outerCircle = document.querySelector(".circle");

document.addEventListener("keypress", function () {
  if (started == false) {
    circle.style.color = "";
    circle.innerHTML = "";
    circle.style.textShadow = "";
    container.style.boxShadow = "";
    outerCircle.style.backgroundColor = "";
    started = true;
    h3.innerText = "";

    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");
  btn.style.border = `0.5rem solid ${btn.classList[1]}`;
  btn.style.boxShadow = `0 0 1.125rem white`;
  btn.style.opacity = "1";
  setTimeout(function () {
    btn.classList.remove("flash");
    btn.style.border = "";
    btn.style.boxShadow = "";
    btn.style.opacity = "";
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  btn.style.border = `0.5rem solid ${btn.classList[1]}`;
  btn.style.boxShadow = `0 0 1.125rem white`;
  btn.style.opacity = "1";

  setTimeout(function () {
    btn.classList.remove("userflash");
    btn.style.border = "";
    btn.style.boxShadow = "";
    btn.style.opacity = "";
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;
  circle.innerText = `${level}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  gameFlash(randBtn);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      container.style.boxShadow = "0 0 37rem yellow";
      setTimeout(function () {
        container.style.boxShadow = "";
      }, 500);
      setTimeout(levelUp, 1000);
    }
  } else {
    let prev = highestScore;
    highestScore = Math.max(highestScore, level);
    if (prev != highestScore) {
      h3.innerText = `"Congratulations! You've achieved a new Highest Score!"`;
    }
    h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Highest Score : ${highestScore} <br> Press any key to start.`;
    circle.style.color = "white";
    circle.innerHTML = "Game<br>Over!";
    circle.style.textShadow = "0 0 3rem red";
    outerCircle.style.backgroundColor = "black";

    body.style.backgroundColor = "red";
    container.style.boxShadow = "0 0 2rem red";
    setTimeout(function () {
      body.style.backgroundColor = "white";
    }, 150);

    reset();
  }
}

function btnPress() {
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
