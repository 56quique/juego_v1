const player = document.getElementById("player");
const world = document.getElementById("world");
const scoreDisplay = document.getElementById("score");

const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");
const jumpBtn = document.getElementById("jumpBtn");

let playerX = 100;
let playerY = 0;
let velocityY = 0;

const gravity = 0.8;
const jumpPower = 15;
const playerSpeed = 5;

let movingLeft = false;
let movingRight = false;
let onGround = false;

let score = 0;

// TOUCH
leftBtn.addEventListener("touchstart", () => movingLeft = true);
leftBtn.addEventListener("touchend", () => movingLeft = false);

rightBtn.addEventListener("touchstart", () => movingRight = true);
rightBtn.addEventListener("touchend", () => movingRight = false);

jumpBtn.addEventListener("touchstart", jump);

// CLICK (PC)
leftBtn.addEventListener("mousedown", () => movingLeft = true);
leftBtn.addEventListener("mouseup", () => movingLeft = false);

rightBtn.addEventListener("mousedown", () => movingRight = true);
rightBtn.addEventListener("mouseup", () => movingRight = false);

jumpBtn.addEventListener("click", jump);

// TECLADO
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") movingLeft = true;
    if (e.key === "ArrowRight") movingRight = true;
    if (e.key === "ArrowUp") jump();
});

document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft") movingLeft = false;
    if (e.key === "ArrowRight") movingRight = false;
});

function jump() {
    if (onGround) {
        velocityY = jumpPower;
        onGround = false;
    }
}

function checkPlatforms() {
    const platforms = document.querySelectorAll(".platform");
    onGround = false;

    platforms.forEach(platform => {
        const rect = platform.getBoundingClientRect();
        const playerRect = player.getBoundingClientRect();

        if (
            playerRect.bottom >= rect.top &&
            playerRect.bottom <= rect.top + 20 &&
            playerRect.right > rect.left &&
            playerRect.left < rect.right
        ) {
            playerY = rect.top - world.getBoundingClientRect().top - 60;
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

    player.style.left = playerX + "px";
    player.style.bottom = playerY + "px";

    checkPlatforms();
    updateScore();

    let cameraX = playerX - window.innerWidth / 3;
    if (cameraX < 0) cameraX = 0;

    world.style.transform = `translateX(${-cameraX}px)`;

    requestAnimationFrame(gameLoop);
}

gameLoop();
