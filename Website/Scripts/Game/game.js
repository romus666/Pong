var won = 1;
var canvas;
var ctx;
var gameBorderDistance = 20;
var player1;
var player2;
var running = false;
var ball;
var fieldColor = 'darkgreen';
var moveId1 = null;
var moveId2 = null;
var speedId = null;
var countdownId = null;
var paused = false;
var soundHit = new Audio("/Sound/Hit.wav"); // buffers automatically when created
var soundSmash = new Audio("/Sound/Smash.wav"); // buffers automatically when created
var soundOut = new Audio("/Sound/Out.wav"); // buffers automatically when created
var winscore;
var gamefinished = false;
var point1 = 0;
var point2 = 0;

$(document).ready(function () {

    canvas = document.getElementById("gameboard");
    if (canvas != null) {
        console.log(canvas);
        ctx = canvas.getContext("2d");
        ctx.font = "100px Arial";
        winscore = Number($("#winscore").val());
        NewGame(2, canvas);
    }
});




function NewGame(won, canvas) {
    CountDown();
    running = true;
    ball.init(won, canvas);
    player1 = null;
    player2 = null;
    var playerOneAI = Boolean($("#playerOneAI").val() == "true");
    var playerTwoAI = Boolean($("#playerTwoAI").val() == "true");
    player1 = new Player(1, canvas, playerOneAI);
    player2 = new Player(2, canvas, playerTwoAI);
    
}



function CountDown() {
    var start = 3;
    countdownId = setInterval(function () {
        DrawField()
        ctx.fillStyle = "#ff0000";
        ctx.fillText(start, canvas.width / 2 - 30, canvas.height / 2);
        start--;
        if(start == -1)
        {
           
            clearInterval(countdownId);
            RunGame();
        }
    }, 700);
}


function SetPoints(point) {

    if (point == 1) {
        point1 = Number($(".player1").text());
        point1 ++;
        console.log("winscore ", winscore);
        console.log("point1 ", point1);
        if (point1 == winscore) {
            gamefinished = true;
            EndGame();
        }
        $(".player1").text(point1);
        won = 1;
    }
    else if (point == 2) {
        point2 = Number($(".player2").text());
        point2 ++;
        if (point2 == winscore) {
            gamefinished = true;
            EndGame();
        }
        $(".player2").text(point2);
        won = 2;
    }
    
    if (!gamefinished) {
        setTimeout(function () {
            NewGame(won, canvas);
        }, 100);
    }
   
}

function EndGame() {
    var endGameModel = {
        GameId: $("#gameId").val(),
        PlayerOneScore: point1,
        PlayerTwoScore: point2
    }
    $.ajax({
        url: '/Game/EndGame',
        type: 'POST',
        data: endGameModel,
        success: function(result){
            $(".board-content").html(result);
        },
        error: {}
    });

}

function RunGame() {
    if (running) {

        var interValId = setInterval(function () {
            if (!paused) {
                stillRunning = ball.calcPos(canvas, ctx, player1, player2);
                if (stillRunning != 0) {
                    clearInterval(interValId);
                    running = false;
                    SetPoints(stillRunning);
                };
                //ctx.beginPath();
                Render();
            }
            //ctx.closePath();
        }, 1);
    }
}

function Render() {
    DrawField()
    ctx.drawImage(ball.imageObj, ball.x, ball.y);
}



function DrawField() {
    ctx.fillStyle = fieldColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.strokeStyle = "#FFFFFF";
    ctx.stroke();
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI, false);
    player1.DrawPlayer(ctx);
    player2.DrawPlayer(ctx);
    
}

window.addEventListener("keydown", function (e) {

    if (e.keyCode == 80) {
        player2.MovePlayer("up");
    }
    if (e.keyCode == 192) {
        player2.MovePlayer("down");
    }
    if (e.keyCode == 81) {
        player1.MovePlayer("up");
    }
    if (e.keyCode == 65) {
        player1.MovePlayer("down");
    }
}, false);



window.addEventListener("keyup", function (e) {
    if (e.keyCode == 83) {
        paused = !paused;
    }
}, false);
    
function toRadians(degrees){
    return  degrees * (Math.PI / 180);
}