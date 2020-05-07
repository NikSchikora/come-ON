export default class NPC {
  constructor(scene, data) {
    this.scene = scene;
    this.data = data;
    this.sprite = scene.add
      .image(data.x, data.y, data.name + "Sprite")
      .setScale(0.05, 0.05);
    this.dialogues = data.dialogue;
  }
}
