// This gets my canvas element.
const canvas = document.getElementById("PingPongDesign");
const ctx = canvas.getContext("2d");

// Here I define the player, i set all thier characteristics.
const player1 = {
    x: 20,
    y: 150,
    width: 10,
    height: 60,
    color: 'red',
    speed : 5 
};

const player2 = {
    x: canvas.width - 30,
    y: 150,
    width: 10,
    height: 60,
    color: 'blue',
    speed : 5
    
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
function drawBall(){ 
    ctx.fillStyle = ball.color; // sets the fill color to the balls color.
    ctx.fillRect(ball.x, ball.y, ball.width, ball.height);    //this draws a small square.
}

// Function to draw the game layout
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);   //This basically fills the entire background of the game, making it dark, or black.

  

    //Here I am calling the function for the triange score holder, inside draw game
     drawScoreTriangle();
     

    // Draw paddles and ball
    drawPaddle(player1);
    drawPaddle(player2);         //Here I am calling the function of the 2 players and the ball.
    drawBall();
    


}

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


// Function to move ball
function moveBall(){
     ball.x += ball.dx;      //moves balls horizontally
     ball.y += ball.dy;   //moves ball vertically

// if ball collides or goes into the top or botton walls
     if(ball.y <= 0 || ball.y >= canvas.height - ball.height) {

	ball.dy *= -1;  // direct the ball the opposite y direction making it bounce of the walls
    }
    
// Ensures whether or not the ball hits either player 1 or player 2 paddle, if it does the ball is reversed 
    if (
       (ball.x <= player1.x + player1.width && ball.y >= player1.y && ball.y <= player1.height + player1.y) ||
       (ball.x + ball.width >= player2.x && ball.y >= player2.y && ball.y <= player2.y + player2.height) 
   
  )  {
        ball.dx *= -1;  // reverse the direction of the ball
     }


// this looks at if ball moves either player paddle, which updates the score for the other player.

    if(ball.x <= 0) {
      player2Score++;
      resetBall();

   }

   if (ball.x >= canvas.width) {
       player1Score++;
       resetBall();

   }  
 } 



//Here I make a triangle shape to hold both the scores of player 1 and 2.
 
 function drawScoreTriangle() {
      ctx.beginPath();
    
    // Define triangle points (upside-down and attached to the top)
    ctx.moveTo(canvas.width / 2, canvas.height * 0.05); // draws top center point of the triangle
    ctx.lineTo(canvas.width * 0.1, canvas.height * 0.12); // draws the Left corner of the traingle
    ctx.lineTo(canvas.width * 0.9, canvas.height * 0.12); // draws right corner of triangel
    ctx.closePath();

    // Fill Player 1's side with red
    ctx.fillStyle = "red";
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height * 0.05); 
    ctx.lineTo(canvas.width * 0.9, canvas.height * 0.12); 
    ctx.lineTo(canvas.width / 2, canvas.height * 0.12);
    ctx.closePath();

    // Fill Player 2's side (right) with blue
    ctx.fillStyle = "blue";
    ctx.fill();

    // Draw Player 1 Score (Left side in red section)
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(player1Score, canvas.width * 0.15, canvas.height * 0.09);

    // Draw Player 2 Score (Right side in blue section)
    ctx.fillText(player2Score, canvas.width * 0.75, canvas.height * 0.09);



}  



// This function just resets the ball in a different position just after scoring 

   function resetBall() {
      ball.x = canvas.width / 2 - 5;
      ball.y = canvas.height / 2 - 5;
      ball.dx = 3 * (Math.random() > 0.5 ? 1 : -1); // this just randomizes the direction of whereever the ball is going 
      ball.dy = 3 * (Math.random() > 0.5 ? 1 : -1); 
}


  // This is the function calls the functions of the game state.
   function updateGame() {
       movePaddles();
       moveBall();
       drawGame();
      requestAnimationFrame(updateGame); // make sure the game updates at the correct refresh rate, 60 frames per second.
 }

 //This event listener is to detect when a key is pressed and validate it as true or false.

document.addEventListener('keydown', (e) => {
       keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
       keys[e.key] = false;
});

updateGame();
