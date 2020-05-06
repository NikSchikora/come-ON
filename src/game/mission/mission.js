import Phaser from "../engine/phaser.js";

let sequence, object;

export default class Mission {
  constructor(data, scene, player) {
    this.scene = scene;
    this.data = data;
    this.player = player;
    sequence = data["sequence"];
    object = data["object"];
    this.currentState = sequence[0];
    this.stateCount = 0;
  }

  initializeMission() {
    //Add Object-Image
    this.objectSprite = this.scene.add
      .image(object["X"], object["Y"], this.data["name"] + "Sprite")
      .setScale(0.3, 0.3);
    console.log(this.data["name"] + "Object");
  }

  nextSequence() {
    this.stateCount++;
    this.currentState = sequence[this.stateCount];
  }
}
