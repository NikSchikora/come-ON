export default class NPC {
  constructor(scene, data) {
    this.scene = scene;
    this.data = data;
    this.sprite = scene.add
      .image(data.x, data.y, data.name + "Sprite")
      .setScale(0.5, 0.5);
    this.dialogues = data.dialogue;
  }
}
