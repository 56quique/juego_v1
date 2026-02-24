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
let score = 0;
let highScore = localStorage.getItem("miqueHighScore") || 0;

highScoreDisplay.innerText = highScore;

function createObstacle() {
    if (gameOver) return;

    const obstacle = document.createElement("div");
    obstacle.classList.add("obstacle");
    obstacle.style.left = game.offsetWidth + "px";
    game.appendChild(obstacle);
    obstacles.push(obstacle);

    setTimeout(createObstacle, 1500 + Math.random() * 2000);
}

createObstacle();

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

    score++;
    scoreDisplay.innerText = score;

    obstacles.forEach((obstacle, index) => {
        let obstacleLeft = parseFloat(obstacle.style.left);
        obstacleLeft -= 6;
        obstacle.style.left = obstacleLeft + "px";

        if (obstacleLeft < -40) {
            obstacle.remove();
            obstacles.splice(index, 1);
        }

        let playerRect = player.getBoundingClientRect();
        let obstacleRect = obstacle.getBoundingClientRect();

        if (
            playerRect.right > obstacleRect.left &&
            playerRect.left < obstacleRect.right &&
            playerRect.bottom > obstacleRect.top
        ) {
            endGame();
        }
    });

    requestAnimationFrame(gameLoop);
}

function jump() {
    if (!isJumping && !gameOver) {
        velocityY = -15;
        isJumping = true;
    }
}

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
