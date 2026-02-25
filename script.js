const world = document.getElementById("world");
const player = document.getElementById("player");
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");
const jumpBtn = document.getElementById("jumpBtn");
const scoreDisplay = document.getElementById("score");
const message = document.getElementById("message");

let playerX = 100;
let playerY = 200;
let velocityY = 0;
let gravity = 0.8;
let jumpPower = -15;
let speed = 5;

let movingLeft = false;
let movingRight = false;
let onGround = false;

let score = 0;

let platforms = [];

/* Crear plataformas */
function createPlatform(x, y, width){
  const platform = document.createElement("div");
  platform.classList.add("platform");
  platform.style.left = x + "px";
  platform.style.bottom = y + "px";
  platform.style.width = width + "px";
  world.appendChild(platform);
  platforms.push(platform);
}

/* Nivel */
createPlatform(0, 50, 400);
createPlatform(500, 120, 200);
createPlatform(800, 200, 200);
createPlatform(1100, 80, 300);
createPlatform(1600, 150, 250);
createPlatform(2000, 60, 400);
createPlatform(2500, 180, 300);

/* Movimiento */
function jump(){
  if(onGround){
    velocityY = jumpPower;
    onGround = false;
  }
}

leftBtn.addEventListener("mousedown", ()=> movingLeft=true);
rightBtn.addEventListener("mousedown", ()=> movingRight=true);
leftBtn.addEventListener("mouseup", ()=> movingLeft=false);
rightBtn.addEventListener("mouseup", ()=> movingRight=false);

jumpBtn.addEventListener("click", jump);

document.addEventListener("keydown", (e)=>{
  if(e.code==="ArrowLeft") movingLeft=true;
  if(e.code==="ArrowRight") movingRight=true;
  if(e.code==="Space") jump();
});

document.addEventListener("keyup", (e)=>{
  if(e.code==="ArrowLeft") movingLeft=false;
  if(e.code==="ArrowRight") movingRight=false;
});

/* Game loop */
function gameLoop(){

  // Movimiento horizontal
  if(movingLeft) playerX -= speed;
  if(movingRight) playerX += speed;

  // Gravedad
  velocityY += gravity;
  playerY -= velocityY;

  onGround = false;

  let playerRect = {
    left: playerX,
    right: playerX + 40,
    bottom: playerY,
    top: playerY + 70
  };

  platforms.forEach(platform=>{
    let pLeft = parseFloat(platform.style.left);
    let pBottom = parseFloat(platform.style.bottom);
    let pWidth = parseFloat(platform.style.width);

    let pRect = {
      left: pLeft,
      right: pLeft + pWidth,
      bottom: pBottom,
      top: pBottom + 20
    };

    // Colisión desde arriba
    if(
      playerRect.right > pRect.left &&
      playerRect.left < pRect.right &&
      playerRect.bottom <= pRect.top &&
      playerRect.bottom >= pRect.top - 20 &&
      velocityY >= 0
    ){
      playerY = pRect.top;
      velocityY = 0;
      onGround = true;
    }
  });

  // Caída al vacío
  if(playerY < 0){
    message.innerText = "💀 Caíste al vacío - Recargando...";
    setTimeout(()=> location.reload(),1500);
  }

  // Cámara sigue al jugador
  let cameraX = playerX - 300;
  if(cameraX < 0) cameraX = 0;
  world.style.transform = `translateX(${-cameraX}px)`;

  player.style.left = playerX + "px";
  player.style.bottom = playerY + "px";

  // Puntaje por avanzar
  score = Math.floor(playerX / 10);
  scoreDisplay.innerText = score;

  requestAnimationFrame(gameLoop);
}

gameLoop();
