export default class SpriteObject {
    constructor(x,y,sprites) {
        this.x = x;
        this.y = y;
        this.w = 64;
        this.h = 64;
        this.sprites = sprites;
        this.animRate = 6;
        this.timeUntilNextFrame = 0;
        this.currentImageFrame = 0;
        this.spriteImage = new Image();
    }



    animate(ctx,fromFrame,toFrame,repeat) {
        if(this.timeUntilNextFrame <= 0) {
        this.timeUntilNextFrame = this.animRate;
        this.currentImageFrame ++;
        if(this.currentImageFrame > toFrame) this.currentImageFrame = fromFrame;
        this.spriteImage.src = `Assets/Images/${this.sprites[this.currentImageFrame]}`;
        }
        else {
            this.timeUntilNextFrame--;
        }
        ctx.drawImage(this.spriteImage,this.x - this.w / 2,this.y - this.h / 2,this.w,this.h)
    }
    updatePos(pos) {
        this.x = pos.x;
        this.y = pos.y;
    }
}