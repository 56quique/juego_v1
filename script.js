const player = document.getElementById("player");
const game = document.querySelector(".game");
const message = document.getElementById("message");
const jumpBtn = document.getElementById("jumpBtn");
const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("highScore");

let velocityY = 0;
let gravity = 0.8;
let isJumping = false;
let gameOver = false;

let obstacles = [];
let coins = [];

let score = 0;
let highScore = localStorage.getItem("miqueHighScore") || 0;
highScoreDisplay.innerText = highScore;

function addScore(points) {
    score += points;
    scoreDisplay.innerText = score;
}

/* -------- OBSTÁCULOS -------- */

function createObstacle() {
    if (gameOver) return;

    const obstacle = document.createElement("div");
    obstacle.classList.add("obstacle");
    obstacle.style.left = game.offsetWidth + "px";
    obstacle.dataset.passed = "false";

    game.appendChild(obstacle);
    obstacles.push(obstacle);

    setTimeout(createObstacle, 1500 + Math.random() * 2000);
}

createObstacle();

/* -------- MONEDAS -------- */

function createCoin() {
    if (gameOver) return;

    const coin = document.createElement("div");
    coin.classList.add("coin");
    coin.style.left = game.offsetWidth + "px";

    // Altura aleatoria
    let randomHeight = 100 + Math.random() * 80;
    coin.style.bottom = randomHeight + "px";

    game.appendChild(coin);
    coins.push(coin);

    setTimeout(createCoin, 2000 + Math.random() * 3000);
}

createCoin();

/* -------- GAME LOOP -------- */

function gameLoop() {
    if (gameOver) return;

    velocityY += gravity;
    let playerBottom = parseFloat(getComputedStyle(player).bottom);
    playerBottom -= velocityY;

    if (playerBottom <= 60) {
        playerBottom = 60;
        velocityY = 0;
        isJumping = false;
    }

    player.style.bottom = playerBottom + "px";

    let playerRect = player.getBoundingClientRect();

    /* ---- Obstáculos ---- */
    obstacles.forEach((obstacle, index) => {
        let obstacleLeft = parseFloat(obstacle.style.left);
        obstacleLeft -= 6;
        obstacle.style.left = obstacleLeft + "px";

        if (obstacleLeft < -40) {
            obstacle.remove();
            obstacles.splice(index, 1);
        }

        let obstacleRect = obstacle.getBoundingClientRect();

        // Colisión
        if (
            playerRect.right > obstacleRect.left &&
            playerRect.left < obstacleRect.right &&
            playerRect.bottom > obstacleRect.top
        ) {
            endGame();
        }

        // Punto por superar obstáculo
        if (
            obstacleRect.right < playerRect.left &&
            obstacle.dataset.passed === "false"
        ) {
            obstacle.dataset.passed = "true";
            addScore(10);
        }
    });

    /* ---- Monedas ---- */
    coins.forEach((coin, index) => {
        let coinLeft = parseFloat(coin.style.left);
        coinLeft -= 6;
        coin.style.left = coinLeft + "px";

        if (coinLeft < -30) {
            coin.remove();
            coins.splice(index, 1);
        }

        let coinRect = coin.getBoundingClientRect();

        // Colisión con moneda
        if (
            playerRect.right > coinRect.left &&
            playerRect.left < coinRect.right &&
            playerRect.bottom > coinRect.top &&
            playerRect.top < coinRect.bottom
        ) {
            addScore(25);
            coin.remove();
            coins.splice(index, 1);
        }
    });

    requestAnimationFrame(gameLoop);
}

/* -------- SALTO -------- */

function jump() {
    if (!isJumping && !gameOver) {
        velocityY = -15;
        isJumping = true;
        addScore(2);
    }
}

/* -------- GAME OVER -------- */

function endGame() {
    gameOver = true;
    message.innerText = "💥 Game Over - Tocá para reiniciar";

    if (score > highScore) {
        localStorage.setItem("miqueHighScore", score);
    }
}

game.addEventListener("click", () => {
    if (gameOver) location.reload();
});

jumpBtn.addEventListener("click", jump);
document.addEventListener("keydown", (e) => {
    if (e.code === "Space") jump();
});

gameLoop();