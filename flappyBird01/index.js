var sprt = new Image();
sprt.src = "bird.png"
ht = document.body.clientHeight;
wd = document.body.clientWidth;

barSeed = genRand();
bdPos = 50;
var acc = 1;
gArea.setAttribute("width", wd - 20)
gArea.setAttribute("height", ht - 20)
var barD = wd;
var p = 0;
var ga = document.getElementById("gArea").getContext("2d");
ga.beginPath();
ga.fillRect(0, ht, wd, -100);
ga.fillRect(0, 0, wd, 100);

ga.drawImage(sprt, 50, bdPos, 100, 100)

window.addEventListener("keydown", function(e) {
    if (e.code == "Space") {
        acc = -2.5;
    }
});
window.addEventListener('touchstart', function() {
    acc = -2.5;
});

function genRand() {
    return Math.floor((Math.random() * ht / 2) + ht / 8);
}

function resetOption() {
    ga.font = "30px Aldrich";
    ga.fillStyle = "white";
    ga.textAlign = "center";
    ga.fillText("Game Over", wd / 2, ht / 2);
    ga.fillText("Press r or", wd / 2, ht / 2 + 40);
    ga.fillText("Tap screen to restart", wd / 2, ht / 2 + 70);
    ga.fillStyle = "black";
    setTimeout(function() {
        window.addEventListener("keydown", function(e) {
            if (e.code == "KeyR") {
                gameRestart();
            }
        });
        window.addEventListener('touchstart', function() {
            gameRestart();
        });
    }, 500)
}

function isOut() {
    if (bdPos > ht - 170 || bdPos < 15 || (50 > barD - 100 && 50 < barD + 50 && (bdPos < barSeed - 35 || bdPos > (barSeed + 150) - 60))) {
        return true;
    }
    return false;
}

function gameRestart() {
    if (play == false) {
        p = 0;
        bdPos = 50;
        barD = wd;
        acc = 1;
        play = true;
        gameLoop = setInterval(gameMech, 10);
    }
}

function birdAnimation() {
    bdPos += acc;
    acc += 0.05;
    if (isOut()) {
        acc = 0;
        clearInterval(gameLoop);
        play = false;
        resetOption();
    }
    ga.drawImage(sprt, 50, bdPos, 100, 100)
}

function barGen() {
    ga.fillRect(barD, barSeed, 100, -barSeed);
    ga.fillRect(barD, barSeed + 150, 100, ht);
    if (barD < -100) {
        barSeed = genRand();
        barD = wd;
    }
}

function gameMech() {
    ga.clearRect(0, 0, wd, ht);
    ga.fillRect(0, 0, wd, 50);
    ga.fillRect(0, ht, wd, -100);
    barD -= 2
    barGen();
    birdAnimation();
    ga.font = "20px Aldrich";
    ga.fillStyle = "white";
    ga.textAlign = "left";
    ga.fillText("Points: " + Math.floor(p), wd - 150, 30)
    ga.fillStyle = "black";
    p += 0.05;

}
var gameLoop = setInterval(gameMech, 10);