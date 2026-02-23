const player = document.getElementById("player");
const message = document.getElementById("message");
const container = document.querySelector(".game-container");

const forwardBtn = document.getElementById("forwardBtn");
const backBtn = document.getElementById("backBtn");
const jumpBtn = document.getElementById("jumpBtn");

let position = 0;
let jumping = false;
let gameOver = false;

let obstacles = [];

function createObstacles() {
    const containerWidth = container.offsetWidth;

    for (let i = 200; i < containerWidth - 100; i += 250) {
        let obstacle = document.createElement("div");
        obstacle.classList.add("obstacle");
        obstacle.style.left = i + "px";
        container.appendChild(obstacle);
        obstacles.push(obstacle);
    }
}

createObstacles();

function moveForward() {
    if (gameOver) return;

    const containerWidth = container.offsetWidth;
    if (position < containerWidth - 50) {
        position += 40;
        player.style.left = position + "px";
        checkCollision();
        checkWin();
    }
}

function moveBack() {
    if (gameOver) return;

    if (position > 0) {
        position -= 40;
        player.style.left = position + "px";
    }
}

function jump() {
    if (gameOver) return;
    if (!jumping) {
        jumping = true;
        player.style.bottom = "90px";

        setTimeout(() => {
            player.style.bottom = "0px";
            jumping = false;
        }, 450);
    }
}

function checkCollision() {
    const playerRect = player.getBoundingClientRect();

    obstacles.forEach(obstacle => {
        const obstacleRect = obstacle.getBoundingClientRect();

        const collision =
            playerRect.left < obstacleRect.right &&
            playerRect.right > obstacleRect.left &&
            playerRect.bottom > obstacleRect.top;

        if (collision && !jumping) {
            endGame("💥 Mique chocó! Perdiste.");
        }
    });
}

function checkWin() {
    const containerWidth = container.offsetWidth;
    if (position >= containerWidth - 60) {
        endGame("🏆 ¡Mique ganó!");
    }
}

function endGame(text) {
    gameOver = true;
    message.innerText = text;

    setTimeout(resetGame, 2000);
}

function resetGame() {
    position = 0;
    player.style.left = "0px";
    message.innerText = "";
    gameOver = false;
}

forwardBtn.addEventListener("click", moveForward);
backBtn.addEventListener("click", moveBack);
jumpBtn.addEventListener("click", jump);