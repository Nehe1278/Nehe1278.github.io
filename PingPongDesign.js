// This gets my canvas element.
const canvas = document.getElementById("PingPongDesign");
const ctx = canvas.getContext("2d");

// Here I define the player, i set all thier characteristics.
const player1 = {
    x: 20,
    y: 150,
    width: 10,
    height: 60,
    color: 'red'
};

const player2 = {
    x: canvas.width - 30,
    y: 150,
    width: 10,
    height: 60,
    color: 'blue'
};

// Here I create the ball object. 
const ball = {
    x: canvas.width / 2 - 5,     // This essentially centers the ball, so its at the middle,
    y: canvas.height / 2 - 5,    // I sub by 5 so that the ball is aligned and shifted to the center.
    width: 10,
    height: 10,
    color: 'white'
};

// Here I am drawing the paddles
function drawPaddle(player) {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);    //This draws the rectangle in shape of a paddle.
}

// Function to draw ball
function drawBall() {
    ctx.fillStyle = ball.color; // sets the fill color to the balls color.
    ctx.fillRect(ball.x, ball.y, ball.width, ball.height);    //this draws a small square.
}

// Function to draw the game layout
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);   //This basically fills the entire background of the game, making it dark, or black.


    // Draw paddles and ball
    drawPaddle(player1);
    drawPaddle(player2);         //Here I am calling the function of the 2 players and the ball.
    drawBall();
}

// Initial draw call
drawGame();              // Here I am calling the function.

