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
const playerSpeed = 4;

let movingLeft = false;
let movingRight = false;
let onGround = false;
let score = 0;

/* ==== SPRITE ANIMACIÓN ==== */
let frame = 0;
let frameTimer = 0;
const totalFrames = 3;
const frameWidth = 120; // ancho de cada frame

/* --- PREVENIR SCROLL --- */
window.addEventListener("keydown", function(e) {
    if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(e.key)) {
        e.preventDefault();
    }
}, false);

/* --- CONTROLES TECLADO --- */
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

/* --- BOTONES CELULAR --- */
leftBtn.ontouchstart = () => movingLeft = true;
leftBtn.ontouchend = () => movingLeft = false;

rightBtn.ontouchstart = () => movingRight = true;
rightBtn.ontouchend = () => movingRight = false;

jumpBtn.ontouchstart = () => {
    if (onGround) {
        velocityY = jumpPower;
        onGround = false;
    }
};

/* --- PLATAFORMAS --- */
const platforms = document.querySelectorAll(".platform");

function checkPlatforms() {
    onGround = false;

    platforms.forEach(platform => {
        const pLeft = platform.offsetLeft;
        const pBottom = parseInt(platform.style.bottom);
        const pWidth = platform.offsetWidth;
        const pHeight = platform.offsetHeight;

        if (
            playerX + frameWidth > pLeft &&
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

/* --- GAME LOOP --- */
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

    checkPlatforms();

    /* ==== ANIMACIÓN ==== */
    if (movingLeft || movingRight) {

        frameTimer++;

        if (frameTimer > 8) {
            frame++;
            if (frame >= totalFrames) frame = 0;
            player.style.backgroundPosition = `-${frame * frameWidth}px 0px`;
            frameTimer = 0;
        }

    } else {
        frame = 0;
        player.style.backgroundPosition = "0px 0px";
    }

    /* Giro */
    if (movingLeft) {
        player.style.transform = "scaleX(-1)";
    } else if (movingRight) {
        player.style.transform = "scaleX(1)";
    }

    /* Puntaje */
    score = Math.floor(playerX / 50);
    scoreDisplay.textContent = score;

    /* Cámara */
    let cameraX = playerX - window.innerWidth / 3;
    if (cameraX < 0) cameraX = 0;
    world.style.transform = `translateX(${-cameraX}px)`;

    player.style.left = playerX + "px";
    player.style.bottom = playerY + "px";

    requestAnimationFrame(gameLoop);
}

gameLoop();
