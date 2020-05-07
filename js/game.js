var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var bx = canvas.width/2;
var by = canvas.height/2;
var br = 10;
var dx = 1;
var dy = 1;

var px = canvas.width/2;
var py = canvas.height - 50;
var pdir = 0;

var wcount = 55;
var wx = new Array(wcount);
var wy = new Array(wcount);
var ws = new Array(wcount);
var ww = 40;
var wh = 20;

function drawBall(x,y,r){
    ctx.beginPath();{
        ctx.arc(x, y, r, 0, Math.PI * 2, false);
        ctx.fillStyle = "green";
        ctx.fill();
    }ctx.closePath();
}

function drawWall(x,y,w,h){
    ctx.beginPath();{
        ctx.rect(x, y, w, h);
        ctx.fillStyle = "#44DDAA";
        ctx.fill();
    }ctx.closePath();
}

function coollisionArcRect(bx,by,br,wx,wy,ww,wh) {

    if( Math.abs(bx - (wx + ww/2)) <= br/2 + ww/2 && Math.abs(by - (wy + wh/2)) <= br/2 + wh/2 ){
        var px = bx - dx;
        var py = by + dy;
        if( Math.abs(px - (wx + ww/2)) < br/2 + ww/2 ){
            dy *= -1;
        }else if( Math.abs(py - (wy + wh/2)) < br/2 + wh/2 ){
            dx *= -1;
        }else{
            dx *= -1.5;
            dy *= -1;
        }
        return true;
    }
    return false;

}

function Init(){
    for(var i = 0 ; i < wx.length; i++){
        
        wx[i] = (ww + 1) * (i%11) + 15;
        wy[i] = (wh + 2) * parseInt(i/11) + 5 ;
        ws[i] = true;
    }
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bx += dx;
    by -= dy;
    px += pdir;

    if( bx <= 0 || bx >= canvas.width){
        dx *= -1;
    }

    if(by <= 0){
        dy *= -1;
    }

    if(by >= canvas.height){
        ctx.font = "48px serif";
        ctx.fillText("GameOver", canvas.width/2 - 70, 50);
        return;
    }

    for(var i = 0 ; i < wx.length; i++){
        if(ws[i]){
            if(coollisionArcRect(bx,by,br,wx[i],wy[i],40,20)){
                ws[i] = false
            }
            drawWall(wx[i],wy[i],ww,wh);
        }
    }
    
    coollisionArcRect(bx,by,br,px,py,40,20);
    drawBall(bx,by,br);
    drawWall(px,py,ww,wh);
    
    
}


document.addEventListener("keydown", (e) =>{
    if( e.key == "ArrowRight"){
        pdir = 3;
    }else if( e.key == "ArrowLeft"){
        pdir = -3;
    }
}, false);

document.addEventListener("keyup", (e)=>{
    if( e.key == "ArrowRight"){
        pdir = 0;
    }else if( e.key == "ArrowLeft"){
        pdir = 0;
    }
}, false);


Init();
setInterval(draw, 10);