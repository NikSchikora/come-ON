import Phaser from "../engine/phaser.js";
import Mission from "../mission/mission.js";
import Dialogue from "../dialogues/dialogues.js";
export default class Player {
  constructor(scene, x, y) {
    this.scene = scene;
    this.masterActiveMission = null;
    this.donnaActiveMission = null;
    this.wirtActiveMission = null;
    this.eschActiveMission = null;
    this.mayaActiveMission = null;
    this.leoActiveMission = null;
    this.markActiveMission = null;
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
      .setScale(0.22, 0.22)
      .setSize(14, 20);

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
      if (this.getDistanceSquared(this.masterActiveMission.objectSprite) <= 500) {
        this.collectedObjects.push(this.masterActiveMission.objectSprite);
        this.masterActiveMission.objectSprite.destroy();


        // inventar 
        console.log("item aufgesammelt");
        var img = document.createElement('img');
        img.src = this.masterActiveMission.data.object.sprite;
        var itembox = document.getElementById("inventar");
        itembox.appendChild(img);
        console.log(img.src);
        // inventar Ende


      }
      this.scene.loader.npcList.forEach(function (iteration) {
        if (this.getDistanceSquared(iteration.sprite) <= 500) {
          console.log(iteration.data.name);
          if (
            iteration.data.name == this.masterActiveMission.data.respondingChar.name
          ) {
            let objs = this.collectedObjects;
            if (objs.length == 1) {
              this.masterActiveMission.nextSequence();
              console.log(this.masterActiveMission.currentState);
            }
          }
          this.runDialogue(iteration.data.name);
        }
      }, this);
    }
  }

  loadMission() {
    let master = this.scene.cache.json.get("masterMissionData");
    let max = this.scene.cache.json.get("maxMissionData");
    let donna = this.scene.cache.json.get("donnaMissionData");
    let wirt = this.scene.cache.json.get("wirtMissionData");
    let esch = this.scene.cache.json.get("eschMissionData");
    let maya = this.scene.cache.json.get("mayaMissionData");
    let leo = this.scene.cache.json.get("leoMissionData");
    let mark = this.scene.cache.json.get("markMissionData");

    // master
    this.masterActiveMission = new Mission(master, this.scene, this);
    this.masterActiveMission.initializeMission();
    console.log(this.masterActiveMission.currentState);
    // // max
    // this.maxActiveMission = new Mission(max, this.scene, this);
    // this.maxActiveMission.initializeMission();
    // console.log(this.maxActiveMission.currentState);
    // // // donna
    // this.donnaActiveMission = new Mission(donna, this.scene, this);
    // this.donnaActiveMission.initializeMission();
    // console.log(this.donnaActiveMission.currentState);
    // // // wirt
    // this.wirtActiveMission = new Mission(wirt, this.scene, this);
    // this.wirtActiveMission.initializeMission();
    // console.log(this.wirtActiveMission.currentState);
    // // esch
    // this.eschActiveMission = new Mission(esch, this.scene, this);
    // this.eschActiveMission.initializeMission();
    // console.log(this.eschActiveMission.currentState);
    // // maya
    // this.mayaActiveMission = new Mission(maya, this.scene, this);
    // this.mayaActiveMission.initializeMission();
    // console.log(this.mayaActiveMission.currentState);
    // // leo
    // this.leoActiveMission = new Mission(leo, this.scene, this);
    // this.leoActiveMission.initializeMission();
    // console.log(this.leoActiveMission.currentState);
    // // mark
  //   this.markActiveMission = new Mission(mark, this.scene, this);
  //   this.markActiveMission.initializeMission();
  //   console.log(this.markActiveMission.currentState);
  }

  getCurrentMission() {
    return this.masterActiveMission;
  }

  getDistanceSquared(object) {
    let xDif = this.sprite.x - object.x;
    let yDif = this.sprite.y - object.y;
    return xDif * xDif + yDif * yDif;
  }

  runDialogue(name) {
    let npc = this.scene.loader.getNpcByName(name);
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
      let text = npc.dialogues[this.masterActiveMission.currentState];
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
