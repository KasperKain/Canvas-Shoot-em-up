import CanvasConfigs from "../Configs.js";

export default class GroundImageManager {
  static bg1 = [
    { y: 0, img: new Image() },
    { y: -900, img: new Image() },
  ];
  static scrollSpeed1 = 1;

  static initialize() {
    this.bg1[0].img.src = "Assets/Images/bg.png";
    this.bg1[1].img.src = "Assets/Images/bg.png";
  }

  static animate(ctx) {
    this.bg1.forEach((bg) => {
      bg.y += this.scrollSpeed1;
      if (bg.y >= 900) {
        bg.y = -900;
      } else {
        ctx.drawImage(bg.img, 0, bg.y, CanvasConfigs.width, 900);
      }
    });
  }
}
