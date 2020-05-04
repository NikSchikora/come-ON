import Phaser from "../engine/phaser.js";

let sequence, respondingChar, object;

export default class Mission {
  constructor(data, scene, player) {
    this.scene = scene;
    this.missionData = data;
    this.player = player;
    sequence = data["sequence"];
    respondingChar = data["respondingChar"];
    object = data["object"];
    this.currentState = sequence[0];
  }

  preload() {
    this.scene.load.image(
      this.missionData["name"] + "Object",
      object["sprite"]
    );
    console.log(this.missionData["name"] + "Object" + object["sprite"]);
    this.initializeMission();
  }

  initializeMission() {
    //Add Object-Image
    this.objectSprite = this.scene.add
      .image(object["X"], object["Y"], this.missionData["name"] + "Object")
      .setScale(0.3, 0.3);
    console.log(this.missionData["name"] + "Object");
  }

  runSequence() {}

  complete() {}
}
