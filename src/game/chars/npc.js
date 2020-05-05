export default class NPC {
  constructor(scene, data) {
    this.scene = scene;
    scene.add.image(data.x, data.y, data.name + "Sprite").setScale(0.5, 0.5);
    console.log(data.x + ":" + data.y + "lol");
  }
}
