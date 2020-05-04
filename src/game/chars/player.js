import Phaser from "../engine/phaser.js";
import Mission from "../mission/mission.js";
export default class Player {
  constructor(scene, x, y) {
    this.scene = scene;
    this.activeMission = null;
    this.collectedObjects = [];
    const anims = scene.anims;

    anims.create({
      key: "walk-right",
      frames: anims.generateFrameNumbers("player", { start: 0, end: 2 }),
      frameRate: 7,
      repeat: 0,
    });
    anims.create({
      key: "walk-left",
      frames: anims.generateFrameNumbers("player", { start: 3, end: 5 }),
      frameRate: 7,
      repeat: 0,
    });
    anims.create({
      key: "walk-front",
      frames: anims.generateFrameNumbers("player", { start: 6, end: 8 }),
      frameRate: 7,
      repeat: 0,
    });
    anims.create({
      key: "walk-back",
      frames: anims.generateFrameNumbers("player", { start: 9, end: 11 }),
      frameRate: 7,
      repeat: 0,
    });

    this.sprite = scene.physics.add
      .sprite(x, y, "player", 0)
      .setScale(0.22, 0.22);

    this.keys = scene.input.keyboard.createCursorKeys();
    this.loadMission();
  }

  update() {
    const cursors = this.keys;
    const player = this.sprite;
    const speed = 175;

    player.body.setVelocity(0);

    if (cursors.left.isDown) {
      player.body.setVelocityX(-speed);
    } else if (cursors.right.isDown) {
      player.body.setVelocityX(speed);
    }

    if (cursors.up.isDown) {
      player.body.setVelocityY(-speed);
    } else if (cursors.down.isDown) {
      player.body.setVelocityY(speed);
    }

    player.body.velocity.normalize().scale(speed);

    if (cursors.left.isDown) {
      player.anims.play("walk-left", true);
    } else if (cursors.right.isDown) {
      player.anims.play("walk-right", true);
    } else if (cursors.up.isDown) {
      player.anims.play("walk-back", true);
    } else if (cursors.down.isDown) {
      player.anims.play("walk-front", true);
    } else {
      player.anims.stop();
    }

    if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
      if (this.getDistanceSquared() <= 1000) {
        this.collectedObjects.push(this.activeMission.objectSprite);
        this.activeMission.objectSprite.destroy();
      }
    }
  }

  loadMission() {
    let data = this.scene.cache.json.get("exampleMission");
    this.activeMission = new Mission(data, this.scene, this);
    this.activeMission.preload();
    console.log("afasd");
    console.log(this.activeMission.currentState);
  }

  getCurrentMission() {
    return this.activeMission;
  }

  getDistanceSquared() {
    let object = this.activeMission.objectSprite;
    let xDif = this.sprite.x - object.x;
    let yDif = this.sprite.y - object.y;
    return xDif * xDif + yDif * yDif;
  }
}
