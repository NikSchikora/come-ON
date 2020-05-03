import Phaser from "../engine/phaser.js";

let sequence, respondingChar, object, currentState;

export default class Mission {
  constructor(data, scene, player) {
    this.scene = scene;
    this.missionData = data;
    this.player = player;
    sequence = data["sequence"];
    respondingChar = data["respondingChar"];
    object = data["object"];
    currentState = sequence[0];
  }

  preload() {
    this.scene.load.image(data["name"] + "Object", object["sprite"]);
  }

  initializeMission() {
    //Add Object-Image
    this.scene.add.image(
      object["positionX"],
      object["positionY"],
      this.missionData["name"] + "Object"
    );
  }

  runSequence() {}

  complete() {}
}
