let player = document.getElementById("player");
let message = document.getElementById("message");

let position = 0;
let jumping = false;
let gameWidth = 760;

let obstacles = [];

// Crear obstáculos aleatorios
function createObstacles() {
    for (let i = 150; i < gameWidth; i += 200) {
        let obstacle = document.createElement("div");
        obstacle.classList.add("obstacle");
        obstacle.style.left = i + "px";
        document.querySelector(".game-container").appendChild(obstacle);
        obstacles.push(i);
    }
}

createObstacles();

function moveForward() {
    if (position < gameWidth) {
        position += 40;
        player.style.left = position + "px";
        checkCollision();
        checkWin();
    }
}

function moveBack() {
    if (position > 0) {
        position -= 40;
        player.style.left = position + "px";
    }
}

function jump() {
    if (!jumping) {
        jumping = true;
        player.style.bottom = "80px";

        setTimeout(() => {
            player.style.bottom = "0px";
            jumping = false;
        }, 400);
    }
}

function checkCollision() {
    obstacles.forEach(obsPos => {
        if (position === obsPos && !jumping) {
            message.innerText = "💥 Perdiste! Tocaste un obstáculo.";
            resetGame();
        }
    });
}

function checkWin() {
    if (position >= gameWidth) {
        message.innerText = "🏆 Ganaste!";
        resetGame();
    }
}

function resetGame() {
    setTimeout(() => {
        position = 0;
        player.style.left = "0px";
        message.innerText = "";
    }, 1500);
}