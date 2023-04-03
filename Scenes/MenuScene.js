import CanvasConfigs from "../Configs.js";

export default class MenuScene {
    constructor(ctx,controls) {
        this.ctx = ctx;
        this.controls = controls;
this.fadeTime = 200;
this.currentFadeTime = 0;
this.blinkTime = 30;
this.currentBlinkTime = 0;
this.showingText = false;
this.hasPressedKey = false;
    }

    fadein() {
        if(this.currentFadeTime >= this.fadeTime) this.currentFadeTime = this.fadeTime;
        else this.currentFadeTime++;
        const alphaColor = () => {
            let timeConversion = this.currentFadeTime / this.fadeTime * 100;
            return timeConversion / 100;
        }
        let alpha = alphaColor();
        this.ctx.fillStyle = `rgba(255, 255, 255, ${1 - alpha})`
        this.ctx.fillRect(0, 0, CanvasConfigs.width, CanvasConfigs.height);
    }
    fadeout() {
        if(this.currentFadeTime <= 0) {this.currentFadeTime = 0; return true}
        else this.currentFadeTime--;
        const alphaColor = () => {
            let timeConversion = this.currentFadeTime / this.fadeTime * 100;
            return timeConversion / 100;
        }
        let alpha = alphaColor();
        this.ctx.fillStyle = `rgba(255, 255, 255, ${1 -alpha})`
        this.ctx.fillRect(0, 0, CanvasConfigs.width, CanvasConfigs.height);
        this.blinkTime = 5;
    }

    drawText() {
        this.ctx.fillStyle = 'white';

        this.ctx.font = '18px serif'
        this.ctx.fillText('A mini-game by',21,30);
        this.ctx.fillText('Kasper Kain',30,50)
        if(this.currentBlinkTime > this.blinkTime) {this.currentBlinkTime = 0, this.showingText = !this.showingText}
        else {this.currentBlinkTime ++}

        if(this.showingText) {
            this.ctx.font = "30px serif";
            this.ctx.fillText("Press Start", 20, 300);
        }
    }

update() {
    if(!this.hasPressedKey) {
    this.fadein();
    }
    if(this.currentFadeTime >= this.fadeTime) {
        this.drawText();

        if(this.controls.key('confirm')){
            console.log('pressed')
            this.hasPressedKey = true;
        }
    }
    if(this.hasPressedKey) {
        this.fadeout();
        this.drawText();
        if(this.hasPressedKey && this.currentFadeTime <= 0) {
            return true;
        }
    }
}
}