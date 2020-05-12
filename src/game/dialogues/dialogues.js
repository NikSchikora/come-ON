import Phaser from "../engine/phaser.js";

let x, y, width, height, quote;

export default class Dialogue {
  constructor(scene) {
    this.scene = scene;
  }

  createSpeechBubble(x, y, quote) {
    var bubbleWidth = 700;
    var bubbleHeight = 100;
    var bubblePadding = 10;
    var arrowHeight = bubbleHeight / 4;

    var bubble = this.scene.add.graphics({ x: x - 350, y: y + 100 });

    //  Bubble shadow
    bubble.fillStyle(0x222222, 0.5);
    bubble.fillRoundedRect(6, 6, bubbleWidth, bubbleHeight, 16);

    //  Bubble color
    bubble.fillStyle(0xffffff, 1);

    //  Bubble outline line style
    bubble.lineStyle(4, 0x565656, 1);

    //  Bubble shape and outline
    bubble.strokeRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);
    bubble.fillRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);

    var content = this.scene.add.text(0, 0, quote, {
      fontFamily: "Arial",
      fontSize: 12,
      color: "#000000",
      align: "center",
      wordWrap: { width: bubbleWidth - bubblePadding * 2 },
    });

    var b = content.getBounds();

    content.setPosition(
      bubble.x + bubbleWidth / 2 - b.width / 2,
      bubble.y + bubbleHeight / 2 - b.height / 2
    );
    return [bubble, content];
  }
}
