import Phaser from "../engine/phaser.js";

let sequence, object;

export default class Mission {
  constructor(data, scene, player) {
    this.scene = scene;
    this.missionData = data;
    this.player = player;
    sequence = data["sequence"];
    object = data["object"];
    this.currentState = sequence[0];
  }

  initializeMission() {
    //Add Object-Image
    this.objectSprite = this.scene.add
      .image(object["X"], object["Y"], this.missionData["name"] + "Sprite")
      .setScale(0.3, 0.3);
    console.log(this.missionData["name"] + "Object");
  }

  runSequence() {}

  complete() {}
}
