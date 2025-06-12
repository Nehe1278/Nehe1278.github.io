
// Get canvas element
const canvas = document.getElementById("PingPongDesign");
const ctx = canvas.getContext("2d");

// Player definitions
const player1 = { x: 20, y: 150, width: 10, height: 60, color: 'red', speed: 5 };
const player2 = { x: canvas.width - 30, y: 150, width: 10, height: 60, color: 'blue', speed: 5 };

// Ball definition
const ball = { x: canvas.width / 2 - 5, y: canvas.height / 2 - 5, width: 10, height: 10, color: 'white', dx: 3, dy: 3 };

// Score tracking & game variables
let player1Score = 0, player2Score = 0, currentLevel = 1, isPaused = false;
const keys = {};
let ballTrail = []; // Array to store ball positions for trail effect

// Sound effects
const bounceSound = new Audio("bounce.mp3");
const scoreSound = new Audio("score.mp3");
const pauseSound = new Audio("pause.mp3");

// Function to draw paddles
function drawPaddle(player) {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Function to draw ball & trail effect
function drawBall() {
    // Add current ball position to trail array
    ballTrail.push({ x: ball.x, y: ball.y });

    // Keep trail array limited to recent positions
    if (ballTrail.length > 10) ballTrail.shift();

    // Draw fading trail
    ballTrail.forEach((pos, index) => {
        ctx.fillStyle = `rgba(255, 255, 255, ${index / 10})`;
        ctx.fillRect(pos.x, pos.y, ball.width, ball.height);
    });

    // Draw actual ball
    ctx.fillStyle = ball.color;
    ctx.fillRect(ball.x, ball.y, ball.width, ball.height);
}

// Function to draw upside-down triangle score display
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

    // Draw scores inside triangle
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(player1Score, canvas.width * 0.15, canvas.height * 0.09);
    ctx.fillText(player2Score, canvas.width * 0.75, canvas.height * 0.09);
}

// Function to draw the game layout
function drawGame() {
    // Change background color based on level
    const colors = ["black", "navy", "purple", "green", "orange", "teal", "darkred"];
    ctx.fillStyle = colors[Math.min(currentLevel - 1, colors.length - 1)];
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw score triangle
    drawScoreTriangle();

    // Draw paddles & ball
    drawPaddle(player1);
    drawPaddle(player2);
    drawBall();

    // Display current level in top-left corner
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.fillText("Level: " + currentLevel, 10, 20);
}

// Function to move paddles
function movePaddles() {
    if (keys['ArrowUp'] && player2.y > 0) player2.y -= player2.speed;
    if (keys['ArrowDown'] && player2.y < canvas.height - player2.height) player2.y += player2.speed;
    if (keys['w'] && player1.y > 0) player1.y -= player1.speed;
    if (keys['s'] && player1.y < canvas.height - player1.height) player1.y += player1.speed;
}

// Function to move ball
function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Collision with walls
    if (ball.y <= 0 || ball.y >= canvas.height - ball.height) {
        ball.dy *= -1;
        bounceSound.play();
    }

    // Collision with paddles
    if ((ball.x <= player1.x + player1.width && ball.y >= player1.y && ball.y <= player1.y + player1.height) ||
        (ball.x + ball.width >= player2.x && ball.y >= player2.y && ball.y <= player2.y + player2.height)) {
        ball.dx *= -1;
        bounceSound.play();
    }

    // Scoring condition
    if (ball.x <= 0) {
        player2Score++;
        checkLevelUp();
        scoreSound.play();
        resetBall();
    }
    if (ball.x >= canvas.width) {
        player1Score++;
        checkLevelUp();
        scoreSound.play();
        resetBall();
    }

    // **Match-winning condition: First to 7 wins**
    if (player1Score >= 7 || player2Score >= 7) {
        alert(`Game Over! ${player1Score >= 7 ? "Player 1" : "Player 2"} Wins!`);
        resetGame();
    }
}

// Function to increase level every 3 points
function checkLevelUp() {
    let totalScore = player1Score + player2Score;
    if (totalScore % 3 === 0 && currentLevel < 7) currentLevel++;
}

// Function to reset ball position & speed
function resetBall() {
    ball.x = Math.random() * (canvas.width - 100) + 50;
    ball.y = Math.random() * (canvas.height - 100) + 50;

    let baseSpeed = 2 + currentLevel;
    ball.dx = baseSpeed * (Math.random() > 0.5 ? 1 : -1);
    ball.dy = baseSpeed * (Math.random() > 0.5 ? 1 : -1);
}

// Function to reset the game
function resetGame() {
    player1Score = 0;
    player2Score = 0;
    currentLevel = 1;
    resetBall();
}

// Power-up system (random boosts)
function spawnPowerUp() {
    if (Math.random() < 0.1) { // 10% chance of a power-up appearing
        let randomEffect = Math.random() > 0.5 ? "speed" : "paddleSize";
        
        if (randomEffect === "speed") ball.dx *= 1.2; // Speed boost
        if (randomEffect === "paddleSize") player1.height += 10; // Paddle enlargement for Player 1
    }
}

// Update game state
function updateGame() {
    if (!isPaused) {
        movePaddles();
        moveBall();
        drawGame();
        spawnPowerUp();
    }
    requestAnimationFrame(updateGame);
}

// Event listeners (pause feature included)
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        isPaused = !isPaused;
        pauseSound.play();
    }
    keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Start game loop
updateGame();

