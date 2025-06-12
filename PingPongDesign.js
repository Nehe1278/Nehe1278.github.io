// This gets my canvas element
const canvas = document.getElementById("PingPongDesign");
const ctx = canvas.getContext("2d");

// Define players with characteristics
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

// Define the ball object
const ball = {
    x: canvas.width / 2 - 5,
    y: canvas.height / 2 - 5,
    width: 10,
    height: 10,
    color: 'white',
    dx: 3,
    dy: 3
};

// Score tracking
let player1Score = 0;
let player2Score = 0;
let currentLevel = 1; // Start at Level 1
let isPaused = false; // Pause state

// Object to track key presses
const keys = {};

// Function to draw paddles
function drawPaddle(player) {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Function to draw the ball
function drawBall() {
    ctx.fillStyle = ball.color;
    ctx.fillRect(ball.x, ball.y, ball.width, ball.height);
}

// Function to draw the upside-down triangle score display
function drawScoreTriangle() {
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height * 0.05);
    ctx.lineTo(canvas.width * 0.1, canvas.height * 0.12);
    ctx.lineTo(canvas.width * 0.9, canvas.height * 0.12);
    ctx.closePath();

    // Fill Player 1's side with red
    ctx.fillStyle = "red";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height * 0.05);
    ctx.lineTo(canvas.width * 0.9, canvas.height * 0.12);
    ctx.lineTo(canvas.width / 2, canvas.height * 0.12);
    ctx.closePath();

    // Fill Player 2's side with blue
    ctx.fillStyle = "blue";
    ctx.fill();

    // Draw Player 1 Score in red section
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(player1Score, canvas.width * 0.15, canvas.height * 0.09);

    // Draw Player 2 Score in blue section
    ctx.fillText(player2Score, canvas.width * 0.75, canvas.height * 0.09);
}

// Function to draw the game layout
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw score display triangle
    drawScoreTriangle();

    // Draw paddles and ball
    drawPaddle(player1);
    drawPaddle(player2);
    drawBall();

    // Draw level number in the top-left corner
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.fillText("Level: " + currentLevel, 10, 20);
}

// Function to move paddles based on key presses
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

// Function to move the ball
function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Ball collision with top and bottom walls
    if (ball.y <= 0 || ball.y >= canvas.height - ball.height) {
        ball.dy *= -1;
    }

    // Ball collision with paddles
    if (
        (ball.x <= player1.x + player1.width && ball.y >= player1.y && ball.y <= player1.y + player1.height) ||
        (ball.x + ball.width >= player2.x && ball.y >= player2.y && ball.y <= player2.y + player2.height)
    ) {
        ball.dx *= -1;
    }

    // Ball goes past paddles (score update)
    if (ball.x <= 0) {
        player2Score++;
        checkLevelUp(); // Check if level should increase
        resetBall();
    }
    if (ball.x >= canvas.width) {
        player1Score++;
        checkLevelUp();
        resetBall();
    }
}

// Function to increase level every 3 points
function checkLevelUp() {
    let totalScore = player1Score + player2Score;
    if (totalScore % 3 === 0) { // Every 3 points, increase level
        currentLevel++;
    }
}

// Function to reset ball position after scoring
function resetBall() {
    // Randomize starting position within playable space
    ball.x = Math.random() * (canvas.width - 100) + 50;
    ball.y = Math.random() * (canvas.height - 100) + 50;

    // Increase speed with level progression
    let baseSpeed = 2 + currentLevel;
    ball.dx = baseSpeed * (Math.random() > 0.5 ? 1 : -1);
    ball.dy = baseSpeed * (Math.random() > 0.5 ? 1 : -1);
}

// Function to update game state
function updateGame() {
    if (!isPaused) {
        movePaddles();
        moveBall();
        drawGame();
    }
    requestAnimationFrame(updateGame);
}

// Event listeners for key presses (including pause function)
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        isPaused = !isPaused; // Toggle pause state
    }
    keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Start the game loop
updateGame();

