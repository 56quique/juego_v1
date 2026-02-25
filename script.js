const player = document.getElementById("player");
const world = document.getElementById("world");
const scoreDisplay = document.getElementById("score");

const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");
const jumpBtn = document.getElementById("jumpBtn");

let playerX = 100;
let playerY = 0;
let velocityY = 0;
let gravity = 0.8;
let jumpPower = 15;
let playerSpeed = 5;
let onGround = false;

let movingLeft = false;
let movingRight = false;

let score = 0;

// Controles táctiles
leftBtn.addEventListener("touchstart", () => movingLeft = true);
leftBtn.addEventListener("touchend", () => movingLeft = false);

rightBtn.addEventListener("touchstart", () => movingRight = true);
rightBtn.addEventListener("touchend", () => movingRight = false);

jumpBtn.addEventListener("touchstart", () => {
    if (onGround) {
        velocityY = jumpPower;
        onGround = false;
    }
});

// Controles teclado
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") movingLeft = true;
    if (e.key === "ArrowRight") movingRight = true;
    if (e.key === "ArrowUp" && onGround) {
        velocityY = jumpPower;
        onGround = false;
    }
});

document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft") movingLeft = false;
    if (e.key === "ArrowRight") movingRight = false;
});

function checkPlatformCollision() {
    const platforms = document.querySelectorAll(".platform");
    onGround = false;

    platforms.forEach(platform => {
        const pLeft = parseInt(platform.style.left);
        const pBottom = parseInt(platform.style.bottom);
        const pWidth = platform.offsetWidth;
        const pHeight = platform.offsetHeight;

        if (
            playerX + 40 > pLeft &&
            playerX < pLeft + pWidth &&
            playerY <= pBottom + pHeight &&
            playerY > pBottom
        ) {
            playerY = pBottom + pHeight;
            velocityY = 0;
            onGround = true;
        }
    });
}

function updateScore() {
    score = Math.floor(playerX / 50);
    scoreDisplay.textContent = score;
}

function gameLoop() {

    if (movingLeft) playerX -= playerSpeed;
    if (movingRight) playerX += playerSpeed;

    velocityY -= gravity;
    playerY += velocityY;

    if (playerY < 0) {
        playerY = 0;
        velocityY = 0;
        onGround = true;
    }

    checkPlatformCollision();
    updateScore();

    // Cámara sigue al jugador
    let cameraX = playerX - window.innerWidth / 3;
    if (cameraX < 0) cameraX = 0;
    world.style.transform = `translateX(${-cameraX}px)`;

    player.style.left = playerX + "px";
    player.style.bottom = playerY + "px";

    requestAnimationFrame(gameLoop);
}

gameLoop();