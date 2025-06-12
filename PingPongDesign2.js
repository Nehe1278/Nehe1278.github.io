const canvas = document.getElementById("PingPongDesign");
const ctx = canvas.getContext("2d");

const player1 = {
    x: 20,
    y: 150,
    width: 10,
    height: 60,
    color: 'red',
    speed: 5
};
const player2 = {
    x: canvas.width - 30,
    y: 150,
    width: 10,
    height: 60,
    color: 'blue',
    speed: 5
};

const ball = {
    x: canvas.width / 2 - 5,
    y: canvas.height / 2 - 5,
    width: 10,
    height: 10,
    color: 'white',
    dx: 3,
    dy: 3
};

let player1Score = 0;
let player2Score = 0;
const keys = {};

let level = 1;
const maxLevel = 4;
let isPaused = false;

function drawPaddle(player) {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawBall() {
    ctx.fillStyle = ball.color;
    ctx.fillRect(ball.x, ball.y, ball.width, ball.height);
}

function drawLevel() {
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText("Level: " + level, 10, 25);  // top-left corner
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawScoreTriangle();
    drawLevel();

    drawPaddle(player1);
    drawPaddle(player2);
    drawBall();
}

function movePaddles() {
    if (keys['ArrowUp'] && player2.y > 0) {
        player2.y -= player2.speed;
    }
    if (keys['ArrowDown'] && player2.y < canvas.height - player2.height) {
        player2.y += player2.speed;
    }
    if (keys['w'] && player1.y > 0) {
        player1.y -= player1.speed;
    }
    if (keys['s'] && player1.y < canvas.height - player1.height) {
        player1.y += player1.speed;
    }
}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y <= 0 || ball.y >= canvas.height - ball.height) {
        ball.dy *= -1;
    }

    if (
        (ball.x <= player1.x + player1.width && ball.y >= player1.y && ball.y <= player1.height + player1.y) ||
        (ball.x + ball.width >= player2.x && ball.y >= player2.y && ball.y <= player2.y + player2.height)
    ) {
        ball.dx *= -1;
    }

    if (ball.x <= 0) {
        player2Score++;
        nextLevelOrReset();
    }
    if (ball.x >= canvas.width) {
        player1Score++;
        nextLevelOrReset();
    }
}

function nextLevelOrReset() {
    if (level < maxLevel) {
        level++;
        increaseSpeed();
    } else {
        level = 1;
        resetSpeed();
    }
    resetBall();
}

function increaseSpeed() {
    // Increase ball speed by 1 unit in both directions, keeping the sign
    ball.dx = (Math.abs(ball.dx) + 1) * (ball.dx > 0 ? 1 : -1);
    ball.dy = (Math.abs(ball.dy) + 1) * (ball.dy > 0 ? 1 : -1);
}

function resetSpeed() {
    // Reset to initial speed for level 1
    ball.dx = 3 * (Math.random() > 0.5 ? 1 : -1);
    ball.dy = 3 * (Math.random() > 0.5 ? 1 : -1);
}

function drawScoreTriangle() {
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height * 0.05);
    ctx.lineTo(canvas.width * 0.1, canvas.height * 0.12);
    ctx.lineTo(canvas.width * 0.9, canvas.height * 0.12);
    ctx.closePath();

    ctx.fillStyle = "red";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height * 0.05);
    ctx.lineTo(canvas.width * 0.9, canvas.height * 0.12);
    ctx.lineTo(canvas.width / 2, canvas.height * 0.12);
    ctx.closePath();

    ctx.fillStyle = "blue";
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(player1Score, canvas.width * 0.15, canvas.height * 0.09);
    ctx.fillText(player2Score, canvas.width * 0.75, canvas.height * 0.09);
}

function resetBall() {
    ball.x = canvas.width / 2 - ball.width / 2;
    ball.y = canvas.height / 2 - ball.height / 2;
    // Set ball speed based on current level
    const baseSpeed = 3 + (level - 1); // base speed increases per level
    ball.dx = baseSpeed * (Math.random() > 0.5 ? 1 : -1);
    ball.dy = baseSpeed * (Math.random() > 0.5 ? 1 : -1);
}

function updateGame() {
    if (!isPaused) {
        movePaddles();
        moveBall();
        drawGame();
    } else {
        drawPauseScreen();
    }
    requestAnimationFrame(updateGame);
}

function drawPauseScreen() {
    ctx.fillStyle = "rgba(0,0,0,0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Game Paused", canvas.width / 2, canvas.height / 2);
    ctx.font = "20px Arial";
    ctx.fillText("Press Escape to Resume", canvas.width / 2, canvas.height / 2 + 40);
}

document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        isPaused = !isPaused;
    } else {
        keys[e.key] = true;
    }
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Initialize the ball position and speed at start
resetBall();
updateGame();

