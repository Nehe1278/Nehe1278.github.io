const canvas =
	document.getElementById("myCanvas")
const ctx = canvas.getContext("2d");

ctx.fillStyle = "blue";
ctx.fillRect(0,0,400,400);

ctx.fillStyle = "white";
ctx.fillRect(0,300,400,100);

function circle(x,y,r){
	ctx.beginPath();
	ctx.arc(x,y,r,0,2*Math.PI);
	ctx.fill();
}

function snowman(x,y){
   circle(x,y,25);
   circle(x,y+50,40);
   circle(x,y+110,55);

}


function smileyFace(x, y) {
    ctx.fillStyle = "green"; 
    circle(x, y, 50); 

    ctx.fillStyle = "black"; 
    circle(x - 20, y - 15, 7);
    circle(x + 20, y - 15, 7); 

    ctx.beginPath(); 
    ctx.arc(x, y + 10, 20, 0, Math.PI);
    ctx.stroke();
}


smileyFace(300, 100);
snowman(100,100);
snowman(200,150);
