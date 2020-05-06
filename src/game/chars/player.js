import Phaser from "../engine/phaser.js";
import Mission from "../mission/mission.js";
import Dialogue from "../dialogues/dialogues.js";
export default class Player {
  constructor(scene, x, y) {
    this.scene = scene;
    this.activeMission = null;
    this.collectedObjects = [];

    //Dialog-Stuff
    this.inDoalogue = false;
    this.lastBubble = null;
    this.bubbleCount = 0;

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
    this.speechManager = new Dialogue(this.scene);
  }

  update() {
    const cursors = this.keys;
    const player = this.sprite;
    const speed = 175;

    player.body.setVelocity(0);

    if (!this.inDoalogue) {
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
    }

    if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
      console.log(player.body.x + ":" + player.body.y);
      if (this.getDistanceSquared(this.activeMission.objectSprite) <= 1000) {
        this.collectedObjects.push(this.activeMission.objectSprite);
        this.activeMission.objectSprite.destroy();
      }
      this.scene.loader.npcList.forEach(function (iteration) {
        if (this.getDistanceSquared(iteration.sprite) <= 1000) {
          console.log(iteration.data.name);
          if (
            iteration.data.name == this.activeMission.data.respondingChar.name
          ) {
            let objs = this.collectedObjects;
            if (objs.length == 1) {
              this.activeMission.nextSequence();
              console.log(this.activeMission.currentState);
            }
            this.runDialogue();
          }
        }
      }, this);
    }
  }

  loadMission() {
    let data = this.scene.cache.json.get("exampleMissionData");
    this.activeMission = new Mission(data, this.scene, this);
    this.activeMission.initializeMission();
    console.log(this.activeMission.currentState);
  }

  getCurrentMission() {
    return this.activeMission;
  }

  getDistanceSquared(object) {
    let xDif = this.sprite.x - object.x;
    let yDif = this.sprite.y - object.y;
    return xDif * xDif + yDif * yDif;
  }

  runDialogue() {
    let npc = this.scene.loader.getNpcByName(
      this.activeMission.data.respondingChar.name
    );
    if (npc != null) {
      this.inDoalogue = true;
      if (this.lastBubble != null) {
        this.lastBubble.forEach(function (b) {
          b.destroy();
        });
      }
      if (this.collectedObjects.length > 0) {
        this.collectedObjects = [];
      }
      let text = npc.dialogues[this.activeMission.currentState];
      if (text.length > this.bubbleCount) {
        this.lastBubble = this.speechManager.createSpeechBubble(
          npc.sprite.x,
          npc.sprite.y - 60,
          text[this.bubbleCount]
        );
        this.bubbleCount++;
      } else {
        this.inDoalogue = false;
        this.bubbleCount = 0;
      }
    }
  }
}
