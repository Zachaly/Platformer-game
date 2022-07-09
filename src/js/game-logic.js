const spriteRunLeft = new Image();
spriteRunLeft.src = "img/spriteRunLeft.png";
const spriteStandLeft = new Image();
spriteStandLeft.src = "img/spriteStandLeft.png"
const spriteRunRight = new Image();
spriteRunRight.src = "img/spriteRunRight.png"
const spriteStandRight = new Image();
spriteStandRight.src = "img/spriteStandRight.png"

class Player{
    constructor(){
        this.position = {
            x: 100,
            y: 100,
        };
        this.velocity = {
            x: 0,
            y: 0,
        }
        this.width = 60;
        this.height = 150;
        this.canJump = true;
        this.frame = 0;
        this.sprites = {
            stand: {
                right: spriteStandRight,
                left: spriteStandLeft,
                cropWidth: 177,
                width: 60,
            },
            run: {
                right: spriteRunRight,
                left: spriteRunLeft,
                cropWidth: 340,
                width: 127.875
            }
        }

        this.curretSprite = this.sprites.stand.right;
        this.curretCropWidth = this.sprites.stand.cropWidth;
    }
    draw(){
        context.drawImage(this.curretSprite, this.curretCropWidth * this.frame, 0, this.curretCropWidth, 400, 
             this.position.x, this.position.y, this.width, this.height);
        
    }

    updatePosition(){
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if(this.position.y + this.height + this.velocity.y < canvas.height){
            this.velocity.y += gravity;
        }

        this.frame++;
        if(this.frame >= 59 && (this.curretSprite == this.sprites.stand.right || this.curretSprite == this.sprites.stand.left)){
            this.frame = 0;
        } else if(this.frame >= 29 && (this.curretSprite == this.sprites.run.right || this.curretSprite == this.sprites.run.left)){
            this.frame = 0;
        }
    }
}

const gravity = 0.25;
const horizontalMoveSpeed = 10;
const verticalMoveSpeed = 10;

const canvas = document.querySelector("canvas");
canvas.width = 1200;
canvas.height = 750;
const context = canvas.getContext("2d");

const player = new Player();
let scrollOffset = 0;

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
    up: {
        pressed: false
    }
}

let animationId = 0;

function animate(){
    animationId = requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);
    decorations.forEach(decoration => decoration.draw()); 
    platforms.forEach(platform => platform.draw());

    player.updatePosition();

    if(keys.right.pressed && player.position.x < canvas.width / 2 + 200){
        player.velocity.x = horizontalMoveSpeed;
        scrollOffset += horizontalMoveSpeed;
    } 
    else if(keys.left.pressed && player.position.x > 50){
        player.velocity.x = -horizontalMoveSpeed;
        scrollOffset -= horizontalMoveSpeed;
    }
    else{
        player.velocity.x = 0;

        if(keys.right.pressed){
            scrollOffset += horizontalMoveSpeed;
            platforms.forEach(platform => platform.position.x -= horizontalMoveSpeed);
            decorations.forEach(decoration => decoration.position.x -= horizontalMoveSpeed - 2);
        }
        else if(keys.left.pressed){
            scrollOffset -= horizontalMoveSpeed;
            platforms.forEach(platform => platform.position.x += horizontalMoveSpeed);
            decorations.forEach(decoration => decoration.position.x += horizontalMoveSpeed - 2);
        }
    }
    
    if(scrollOffset >= 5000){
        alert("win");
        cancelAnimationFrame(animationId);
    }

    if(player.position.y > canvas.height){
        alert("you lost");
        cancelAnimationFrame(animationId);
        window.location.reload();
    }

    platforms.forEach(platform => {
        // collision with platform
        if(checkVerticalCollision(platform)){
            player.velocity.y = 0;
            if(!checkDownPlaformCollision(platform)){
                player.canJump = true;
            }
        }

        if(checkHorizontalPlatformCollision(platform)){
            player.velocity.x = 0;
        }
    });

    player.draw();
}

function checkVerticalCollision(platform){
    return checkDownPlaformCollision(platform) || checkUpPlatformCollision(platform);
}

function checkUpPlatformCollision(platform){
    return player.position.x + player.width >= platform.position.x && 
    player.position.x <= platform.position.x + platform.width &&
    player.position.y + player.height <= platform.position.y && 
    player.position.y + player.height + player.velocity.y >= platform.position.y;
}

function checkDownPlaformCollision(platform){
    return player.position.x + player.width >= platform.position.x && 
    player.position.x <= platform.position.x + platform.width &&
    player.position.y >= platform.position.y + platform.height && 
    player.position.y + player.velocity.y <= platform.position.y + platform.height;
}

function checkHorizontalPlatformCollision(platform){
    const playerInSameY = player.position.y >= platform.position.y && player.position.y <= platform.position.y + platform.height;
    const playerTouchesPlatform = player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width;
    
    return playerInSameY && playerTouchesPlatform;
}

animate();

window.addEventListener("keydown", ({key}) => {
    if(key == 'a'){
        keys.left.pressed = true;
        player.curretSprite = player.sprites.run.left;
        player.curretCropWidth = player.sprites.run.cropWidth;
        player.width = player.sprites.run.width;
    }
    else if(key == 'w'){
        keys.up.pressed = true;
        if(player.canJump){
            player.velocity.y = -verticalMoveSpeed;
            player.canJump = false;
        }
    }
    else if(key == 'd'){
        keys.right.pressed = true;
        player.curretSprite = player.sprites.run.right;
        player.curretCropWidth = player.sprites.run.cropWidth;
        player.width = player.sprites.run.width;
    }
})

window.addEventListener("keyup", ({key}) => {
    if(key == 'a'){
        keys.left.pressed = false;
        player.curretSprite = player.sprites.stand.left;
        player.curretCropWidth = player.sprites.stand.cropWidth;
        player.width = player.sprites.stand.width;
    }
    else if(key == 'w'){
        keys.up.pressed = false;
    }
    else if(key == 'd'){
        keys.right.pressed = false;
        player.curretSprite = player.sprites.stand.right;
        player.curretCropWidth = player.sprites.stand.cropWidth;
        player.width = player.sprites.stand.width;
    }
})