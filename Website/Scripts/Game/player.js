function Player(player, canvas, ai) {
    this.x
    this.unit = player;
    this.ai = ai;
    this.borderDistance = 30;
    this.width = 2;
    this.height = 160;
    this.moveSpeed = 20;
    this.hitOffset = 0;
    this.moving = false;
    
    if (player == 1) {
        this.x = this.borderDistance;
    }
    else {
        this.x = canvas.width - this.borderDistance - this.width;
    }
    this.y = (canvas.height/2) - (this.height/2);
    this.fillStyle = "white";
    this.DrawPlayer = DrawPlayer;
    this.MovePlayer = MovePlayer;
    this.MoveAiPlayer = MoveAiPlayer;
}
function DrawPlayer(ctx) {
    
    ctx.fillStyle = this.fillStyle;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
}



function MoveAiPlayer(player) {

    if (player.ai) {
        console.log("AI ",player.ai);
        ResetMoveAi(player);


        if (!player.moving) {
            player.moving = true;
            var deltaX = Math.abs(player.x - ball.x)

            //console.log("delta x ", deltaX);
            
            var degreeCorrection = 90 - ball.angle % 90;
            var radians = toRadians(degreeCorrection);
            var deltaY = null;
            var targetY = null;

            if (ball.angle > 270 && ball.angle < 360) {
                degreeCorrection = ball.angle % 90;
                radians = toRadians(degreeCorrection);
                deltaY = Math.floor(deltaX / Math.tan(radians));
                targetY = ball.y - deltaY;
            }

            else if (ball.angle > 180 && ball.angle <= 270) {
                degreeCorrection = ball.angle % 90;
                radians = toRadians(degreeCorrection);
                deltaY = Math.floor(deltaX * Math.tan(radians));
                targetY = ball.y - deltaY;
            }


            else if (ball.angle > 0 && ball.angle <= 90) {
                degreeCorrection = ball.angle % 90;
                radians = toRadians(degreeCorrection);
                deltaY = Math.floor(deltaX * Math.tan(radians));
                targetY = ball.y + deltaY
            }
            else if (ball.angle > 90 && ball.angle < 180) {
                degreeCorrection = ball.angle % 90;
                radians = toRadians(degreeCorrection);
                deltaY = Math.floor(deltaX / Math.tan(radians));
                targetY = ball.y + deltaY;
            }
            
            else if (ball.angle == 0 || ball.angle == 180) {
                targetY = ball.y;
            }
            targetY = Math.floor(targetY);
           

                //console.log("Player 2:    " + targetY, "Ball ANGLE:   ", ball.angle);
            //console.log("Player", player.unit, " Delta Y: " + deltaY, "Target Y : ", targetY," Ball Angle : ", ball.angle, "Correction : ", degreeCorrection);
           
            
            

             //   console.log("Player",player.unit," : " + targetY);
            

            var initY = player.y + player.height / 2;
            var sign;

            if (targetY > initY)
                sign = 1;
            else {
                sign = -1;
            }
            if (player.unit == 1) {
                moveId1 = null;
                moveId1 = setInterval(function () {
                    UpdateAiPlayerMovement(player, canvas, targetY, sign);
                }, 100);
            }
            else {
                moveId2 = null;
                moveId2 = setInterval(function () {
                    UpdateAiPlayerMovement(player, canvas, targetY, sign);
                }, 100);
            }
        }
    }
}


function UpdateAiPlayerMovement(player, canvas, targetY, sign) {

    var randomHitArea = Math.floor(Math.random() * (player.height + (player.hitOffset*2))) - ((player.height/2) + player.hitOffset);
    //var randomHitArea = 0;
    var middleOfPlayer = player.y + (player.height / 2);

    if (targetY >= 0 && targetY <= canvas.height) {
        if ((middleOfPlayer + randomHitArea) < targetY && sign > 0) {
            player.y += player.moveSpeed;
        }
        else if ((middleOfPlayer + randomHitArea) > targetY && sign < 0) {
            player.y -= player.moveSpeed;
        }
    }
    else {
        if ((middleOfPlayer + randomHitArea) < canvas.height / 2 && sign > 0) {
            player.y += player.moveSpeed;
        }
        else if ((middleOfPlayer + randomHitArea) > canvas.height / 2 && sign < 0) {
            player.y -= player.moveSpeed;
        }
    }
}

function ResetMoveAi(player) {
    player.moving = false;
    if (player.unit == 1) {
        clearInterval(moveId1);
    }
    else {
        clearInterval(moveId2);
    }
}


function MovePlayer(direction) {
    
    if (direction == "up") {
        this.y -= this.moveSpeed;
    }
    else if (direction == "down") {
        this.y += this.moveSpeed;
    }

    
    
}