import Phaser from "../engine/phaser.js";
import Mission from "../mission/mission.js";
import Dialogue from "../dialogues/dialogues.js";
// import Indoor from "../scenes/IndoorScene.js";

// let interactionX, interactionY;
export default class Player {
  constructor(scene, x, y, interactionX, interactionY) {
    this.scene = scene;
    this.activeMission = null;
    this.collectedObjects = [];
    this.completedMissions = [];
    this.interactionX = interactionX;
    this.interactionY = interactionY;

    console.log(interactionX + " : " + interactionY);

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
      console.log(
        "Camera: " +
          this.scene.cameras.main.centerX +
          " : " +
          this.scene.cameras.main.centerY
      );
      if (this.activeMission != null) {
        if (this.getDistanceSquared(this.activeMission.objectSprite) <= 500) {
          this.collectedObjects.push(this.activeMission.objectSprite);
          this.activeMission.objectSprite.destroy();

          var audio = new Audio(
            "../../../playerSelector/shooting_star-Mike_Koenig-1132888100.mp3"
          );
          audio.play();

          // inventar
          console.log("item aufgesammelt");
          var img = document.createElement("img");
          img.src = this.activeMission.data.object.sprite;
          var itembox = document.getElementById("inventar");
          itembox.appendChild(img);
          console.log(img.src);

          console.log(
            "achtung" + this.interactionX + " : " + this.interactionY
          );
          console.log(this.getDistanceSquaredDoor());

          //Next sequence
          this.activeMission.nextSequence();
        }
      }
      if (player.body.x <= 1971) {
        console.log("taddaa im at the door " + this.getDistanceSquaredDoor());
      }

      this.scene.loader.npcList.forEach(function (iteration) {
        console.log("asdasf");
        if (this.getDistanceSquared(iteration.sprite) <= 500) {
          console.log("asdads" + iteration);
          let ms = iteration.data.mission;
          if (!this.completedMissions.includes(ms)) {
            if (this.activeMission == null) {
              this.activeMission = new Mission(
                this.scene.cache.json.get(ms + "Data"),
                this.scene,
                this
              );
              this.activeMission.initializeMission();
            }
            if (this.activeMission == null) {
              this.runDialogue("standard");
            } else if (
              this.activeMission.data.respondingChar.name == iteration.data.name
            ) {
              this.runDialogue(iteration.data.name);
            }
          } else {
            this.runDialogue("completed");
          }
        }
      }, this);
    }
  }
  getCurrentMission() {
    return this.activeMission;
  }

  getDistanceSquared(object) {
    let xDif = this.sprite.x - object.x;
    let yDif = this.sprite.y - object.y;
    return xDif * xDif + yDif * yDif;
  }

  getDistanceSquaredDoor() {
    let xDif = this.sprite.x - this.interactionX;
    let yDif = this.sprite.y - this.interactionY;
    return xDif * xDif + yDif * yDif;
  }

  getDistanceSquaredOutside() {
    let xDif = this.sprite.x - this.interactionX;
    let yDif = this.sprite.y - this.interactionY;
    return xDif * xDif + yDif * yDif;
  }

  openDoor(input) {
    if (this.getDistanceSquaredDoor() <= 2600) {
      console.log("PLAYER: indoor yay");
      input.scene.start("indoor", { player: this });
      console.log("PLAYER: indoor yay ende");
    }
  }

  closeDoor(input) {
    if (this.getDistanceSquaredOutside() <= 2600) {
      console.log("PLAYER: outside yay");
      input.scene.start("mainScene", { player: this });
      console.log("PLAYER: outside yay ende");
    }
  }

  runDialogue(name) {
    let text = [
      "Oh hallo, wie geht es dir denn?",
      "Ich kann gerade leider nicht mit dir reden, ich bin sehr beschäftigt!",
      "Komm doch später noch einmal!",
    ];
    this.inDoalogue = true;
    if (this.lastBubble != null) {
      this.lastBubble.forEach(function (b) {
        b.destroy();
      });
    }
    if (name != "standard") {
      let npc = this.scene.loader.getNpcByName(name);
      if (npc != null) {
        text = npc.dialogues[this.activeMission.currentState];
      }
    }
    if (name == "completed") {
      text = [
        "Hey, du hast meine Mission schon abgeschlossen!",
        "Vielen Dank für deine Unterstützung",
        "Ich studiere jetzt an der DHBW!",
      ];
    }
    if (text.length > this.bubbleCount) {
      this.lastBubble = this.speechManager.createSpeechBubble(
        this.sprite.x,
        this.sprite.y,
        text[this.bubbleCount]
      );
      this.bubbleCount++;
    } else {
      this.inDoalogue = false;
      this.bubbleCount = 0;
      if (this.activeMission != null) {
        if (this.activeMission.currentState == "intro") {
          this.activeMission.nextSequence();
        }
        if (this.activeMission.currentState == "complete") {
          this.completedMissions.push(this.activeMission.data.name);
          this.activeMission = null;
          console.log("Completed Mission!");
          console.log(this.completedMissions);
        }
      }
    }
  }
}
