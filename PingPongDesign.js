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
    color: 'white',
    dx: 3,   // This is the speed of the ball in the x direction (horizontally)
    dy: 3    // This is the speed of the ball in the y direction (Vertically)
};

    //This essentially is going to keep the score tracking for the game, this is some basic stuff of the game.
    let player1Score = 0;
    let player2Score = 0;  


    //This is going to track key presses
     const keys = {};


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



// Here I basically draw the scores for the game
    ctx.fillStyle = "white"; // changing the font color to white
    ctx.font = "20px Arial"; // Defining the font size and size
    ctx.fillText(player1Score, 50, 30); // This just draws player 1's score at position (50,30), near the the top.
    ctx.fillText(player2Score, canvas.width - 70, 30); // draws the second player score top the right side of the screen.


 //Here this is the importnat part of the game, I am creating a function to move the paddles bassed off of keys that have been pressed.



//this just moves player 2's paddle up when the Arrow key is presseed, this piece of code also makes sure the paddle doesn;t go beyond the top barrier. This will be the same for Arrow Down as well.

function movePaddles() {
    if(keys['ArrowUp'] && player2.y > 0){
    	player2.y -= player2.speed;              //move player up 
     }

// moves player 2 down when Arrow donw key is pressed, and makes sure it doesn't go beyond the botton.
    if (keys['ArrowDown'] && player2.y < canvas.height - player2.height){
        player2.y += player2.speed;                     //moves player down
    }
 
   // when w key is pressed moves player1 paddle up
    if (keys['w'] && player1.y > 0) {
        player1.y -= player1.speed; // Move paddle up by its speed value
    }
    
   // moves player 1 down, when s key is pressed.
    if (keys['s'] && player1.y < canvas.height - player1.height) {
        player1.y += player1.speed; // Move paddle down by its speed value
    }


    }



function moveBall(){
     ball.x += ball.dx;
     ball.y += ball.dy;



}

} 
drawGame();              // Here I am calling the function.
