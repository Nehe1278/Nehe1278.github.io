
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
   
   
    //a single circle
    function circle(x,y){

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(x,y,25,0,2*Math.PI);
    ctx.stroke();
    ctx.fill();
}

circle(100,100);

