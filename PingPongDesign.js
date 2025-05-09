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
