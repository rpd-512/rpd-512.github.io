ht = document.body.clientHeight;
wd = document.body.clientWidth;
gArea.setAttribute("width", wd)
gArea.setAttribute("height", ht)
var ga = document.getElementById("gArea").getContext("2d");
var sprt = new Image();
var frbl = new Image();
var enmy = new Image();
var anim = new Image();
var sx=2;
var sy=ht/2;
var mx = 10;
var ballPos = [];
var enemPos = [];
var canFire = true;
var canEnemy = true;
var points = 0;
var collided = [];
var animFrame = 0;
sprt.src = "images/sShip.png"
frbl.src = "images/fireball.png"
enmy.src = "images/enemy.png"
ga.beginPath();
ga.fillStyle = "white";



function fball(x,y){
    ga.drawImage(frbl, x+25,y, 50, 75)
}
function enemyPlace(x,y){
    ga.drawImage(enmy, x+25,y, 50, 75)
}
function genRand(){return Math.floor((Math.random() * wd-50) + 5);}
function placeFireB(){
    for(pos in ballPos){
        p = ballPos[pos];
        fball(p[0],p[1]);
        ballPos[pos][1] -= 10;
        if(p[1] < -100){ballPos.splice(pos,pos+1)}
    }
}
function placeEnemy(){
    for(pos in enemPos){
        p = enemPos[pos];
        enemyPlace(p[0],p[1]);
        enemPos[pos][1] += (enemPos[pos][1]/100)+2;
        if(p[1] > ht){enemPos.splice(pos,pos+1);points-=1;}
    }
}
function checkCollision(){
    var bigN = enemPos.length-1;
    if(enemPos.length-1<ballPos.length-1){bigN = ballPos.length-1;}
    for(bpos in ballPos){
        var p = ballPos[bpos];
        for(epos in enemPos)
        {e = enemPos[epos];
        ga.fillStyle="white";
        collide = p[1] < e[1] && (p[0] > e[0]-50 && p[0] < e[0]+50);
        if(collide){enemPos.splice(epos,epos+1);ballPos.splice(bpos,bpos+1);points+=1;collided = p;}}
    }

}

function sBody(x){
    ga.drawImage(sprt, x, ht-175, 100, 150)
}
function gameMech(){
    ga.clearRect(0, 0, wd, ht);
    sBody(sx);
    checkCollision();
    placeEnemy();
    placeFireB();
    if(collided.length!=0){
        anim.src="images/bang/bang_"+Math.floor(animFrame)+".png";
        animFrame+=0.5;
        ga.drawImage(anim, collided[0],collided[1], 150, 150)
        if(animFrame>20){animFrame=0;collided=[];}
    }
    ga.font = "20px Aldrich";
    ga.fillStyle = "white";
    ga.textAlign = "left";
    ga.fillText("Points: " + Math.floor(points), wd - 150, 30)
    ga.fillStyle = "black";
    if(mx==0){drg=0;}
    else if(mx>0){drg=-0.1}
    else if(mx<0){drg=0.1}
    mx=mx+drg;
    sx+=mx;
    if(sx < 0){mx+=1;}
    else if(sx > wd-100){mx-=1;}
    if(canEnemy){
        setTimeout(function(){canEnemy=true;}, 2000);
        enemPos.push([genRand(),-100])
        canEnemy = false;
    }
}


window.addEventListener("keydown", function(e) {
    if(e.code=="ArrowRight" || e.code=="KeyD"){mx+=0.75;}
    else if(e.code=="ArrowLeft" || e.code=="KeyA"){mx-=0.75;}
    else if(e.code=="Space" && canFire){ballPos.push([sx,ht-200]);canFire = false; setTimeout(function(){canFire=true},500)}
});


gameLoop = setInterval(gameMech,20);