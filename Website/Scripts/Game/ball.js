var ball = {
    border: 20,
    width: 40,
    height: 40,
    offsetX: 0,
    offsetY:0,
    x: 300,
    y: 350,
    initSpeed: 2,
    speed:2,
    angle:0,
    init: function (won, canvas) {
        ball.imageObj = new Image();
        ball.imageObj.src = "/Images/tennis.png";
        if (won == 1) {
            this.angle = 0;
        }
        else if (won == 2) {
            this.angle = 180;
        }
        
        this.x = canvas.width/2,
        this.y = canvas.height/2-40,
        this.offsetX = this.width / 2,
        this.offsetY = this.height / 2

        this.posX = this.offsetX + this.x;
        this.posY = this.offsetY + this.y;
    },
    calcPos: function (canvas, ctx, player1,player2) {
       
        var smash = false;
        //PLAYER1

        if ((this.posX - (this.width / 2)) < player1.x) {
            var ballYposLower = (this.posY + (this.height / 2));
            var ballYposUpper = (this.posY - (this.height / 2));
            if (ballYposLower >= player1.y && ballYposUpper <= (player1.y + player1.height)) {


                var quarter = player1.height / 4;

                //lowerhalf check

                if (ballYposLower < (player1.y + (quarter * 1))) {
                    ball.angle = (Math.floor(Math.random() * 30) + 300);
                    soundSmash.play();
                    
                }
                else if (ballYposLower < (player1.y + (quarter * 2))) {
                    ball.angle = (Math.floor(Math.random() * 30) + 330);
                    smash = true;
                    soundSmash.play();
                }
                else if (ballYposUpper < (player1.y + (quarter * 3))) {
                    ball.angle = (Math.floor(Math.random() * 30) + 0);
                    smash = true;
                    soundSmash.play();
                }
                else if (ballYposUpper <= (player1.y + (quarter * 4))) {
                    ball.angle = (Math.floor(Math.random() * 30) + 30);
                    soundSmash.play();
                }
                MoveAiPlayer(player1);
                MoveAiPlayer(player2);
            }
        }

        //PLAYER 2
        if ((this.posX + (this.width / 2)) > player2.x) {
            var ballYposLower = (this.posY + (this.height / 2));
            var ballYposUpper = (this.posY - (this.height / 2));
            if (ballYposLower >= player2.y && ballYposUpper <= (player2.y + player2.height)) {
                

                

                var quarter = player2.height / 4;

                //lower
                if (ballYposLower < (player2.y + (quarter * 1))) {
                    ball.angle = (Math.floor(Math.random() * 30) + 210);
                    soundHit.play();
                }
                else if (ballYposLower < (player2.y + (quarter * 2))) {
                    ball.angle = (Math.floor(Math.random() * 30) + 180);
                    smash = true;
                    soundHit.play();
                }
                else if (ballYposUpper < (player2.y + (quarter * 3))) {
                    ball.angle = (Math.floor(Math.random() * 30) + 150);
                    smash = true;
                    soundHit.play();
                }
                else if (ballYposUpper <= (player2.y + (quarter * 4))) {
                    ball.angle = (Math.floor(Math.random() * 30) + 120);
                    soundHit.play();
                    
                }
                
                MoveAiPlayer(player1);
                MoveAiPlayer(player2);
            }
        }
       

        if (ball.posY > canvas.height - ball.border) {
            ball.angle = 360 - ball.angle;
            MoveAiPlayer(player1);
            MoveAiPlayer(player2);
        }

        if (ball.posY < 0 + ball.border) {
            ball.angle = 360 - ball.angle;
            MoveAiPlayer(player1);
            MoveAiPlayer(player2);
        }
        if (ball.posX > canvas.width - ball.border) {
            //ball.angle = 180 - ball.angle;
            soundOut.play();
            return 1;
         
        }
        if (ball.posX < 0 + ball.border) {
            //ball.angle = 180 - ball.angle;
            soundOut.play();
            return 2;
        }
        radians = this.toRadians(ball.angle);

        if (smash) {
            ball.speed = ball.initSpeed+3;
            speedId = setInterval(function () {
                if (ball.speed > ball.initSpeed) {
                    ball.speed -= 0.05;
                }
                else {
                    clearInterval(speedId);
                    smash = false;
                }
            }, 50);
        }
        
        


        ball.x = ball.x += (Math.cos(radians) * ball.speed);
        ball.y = ball.y += (Math.sin(radians) * ball.speed);
        this.posX = this.offsetX + this.x;
        this.posY = this.offsetY + this.y;
        
        return 0;
    },
    toRadians:function(degrees){
        return  degrees * (Math.PI / 180);
    }

}