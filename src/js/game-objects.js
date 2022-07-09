const platformImg = new Image();
platformImg.src = "img/platform.png";

const hills = new Image();
hills.src = "img/hills.png";

const shortPlatformImg = new Image();
shortPlatformImg.src = "img/platformSmallTall.png";

class Platform{
    constructor(x, y){
        this.position = {
            x: x,
            y: y
        };

        this.width = platformImg.width;
        this.height = platformImg.height;
        this.image = platformImg;
    }

    draw(){
        context.drawImage(this.image, this.position.x, this.position.y);
    }
}

class BottomPlatform extends Platform{
    constructor(x){
        super(x, 650)
    }
}

class ShortPlatform extends Platform{
    constructor(x, y){
        super(x,y);
        this.image = shortPlatformImg;
        this.height = shortPlatformImg.height;
        this.width = shortPlatformImg.width;
    }
}

class Scenery{
    constructor(x, y, img){
        this.position = {
            x: x,
            y: y
        };

        this.img = img;
        this.width = img.width;
        this.height = img.height;
    }

    draw(){
        context.drawImage(this.img, this.position.x, this.position.y);
    }
}

const platforms = [
    new BottomPlatform(-1),
    new BottomPlatform(platformImg.width - 3),
    new BottomPlatform(platformImg.width * 2 + 200),
    new BottomPlatform(platformImg.width * 5 + 100),
    new BottomPlatform(platformImg.width * 6 + 98),
    new BottomPlatform(platformImg.width * 8),
    new Platform(platformImg.width * 3.5 + 120, 500),
    new Platform(platformImg.width * 5, 300),
    new ShortPlatform(platformImg.width * 6 + 200, 250),
    new ShortPlatform(platformImg.width * 7 + 100, 250)
    ];

const decorations = [
    new Scenery(100, 200, hills)
]