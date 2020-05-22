import Phaser from "../engine/phaser.js";
import Mission from "../mission/mission.js";
import Dialogue from "../dialogues/dialogues.js";
import Indoor from "../scenes/IndoorScene.js";

// let interactionX, interactionY;
export default class Player {
  constructor(scene, x, y, interactionX, interactionY) {
    this.scene = scene;
    this.activeMission = null;
    this.collectedObjects = [];
    this.completedMissions = [];
    this.interactionX = interactionX;
    this.interactionY = interactionY;

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
      console.log(this.sprite.x + " : " + this.sprite.y);
      if (this.activeMission != null) {
        if (this.getDistanceSquared(this.activeMission.objectSprite) <= 500) {
          this.collectedObjects.push(this.activeMission.objectSprite);
          this.activeMission.objectSprite.destroy();

          var audio = new Audio(
            "../../../playerSelector/shooting_star-Mike_Koenig-1132888100.mp3"
          );
          audio.play();

          // inventar
          var img = document.createElement("img");
          img.src = this.activeMission.data.object.sprite;
          var itembox = document.getElementById("inventar");
          itembox.appendChild(img);

          //Next sequence
          this.activeMission.nextSequence();
        }
      }
      if (this.completedMissions.length < 3) {
        this.scene.loader.npcList.forEach(function (iteration) {
          if (this.getDistanceSquared(iteration.sprite) <= 500) {
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
              if (
                this.activeMission != null &&
                !(
                  this.activeMission.data.respondingChar.name ==
                  iteration.data.name
                )
              ) {
                this.runDialogue("standard");
              } else if (
                this.activeMission.data.respondingChar.name ==
                iteration.data.name
              ) {
                this.runDialogue(iteration.data.name);
              }
            } else {
              this.runDialogue("completed");
            }
          }
        }, this);
      } else {
        this.runDialogue("credits");
      }
    }
  }
  getCurrentMission() {
    return this.masterActiveMission;
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
      input.scene.start("indoor", { player: this });
    }
  }

  closeDoor(input) {
    if (this.getDistanceSquaredOutside() <= 2600) {
      input.scene.start("mainScene", { player: this });
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
    if (name == "credits") {
      text = [
        "...*handy klingeln*...",
        "WESTER: Hallo?",
        "Ist da wer dran?",
        "... ...",
        "Naja egal...",
        "An der DHBW treffen gerade so viele Anmeldezettel ein, so viele neue Studenten!",
        "Jetzt kann die Uni wiedereröffnen! Fantastische Arbeit! Das müssen wir feiern.",
        "Eine solche Leistung bleibt natürlich nicht ungeehrt.",
        "Neben der Tatsache, dass du Teil des Spie... Teil dieser Welt sein darfst, bekommst du...",
        "ein...MINI HANUTA!!!!",
        "Oh. Tut mir leid. Da hat Professor Klee gerade reingerufen...der liebt einfach diese Mini Hanutas. HAHAHA",
        "Was du als Belohnung bekommst. überlege ich mir auf jeden Fall noch *vielleicht gibts ja eine Eherntafel...die würde sich bestimmt schickt im Eingang machen*",
        "MIRTH: *gib mal das Telefon her, Wester....Hallo? Hört man mich?",
        "Es scheint als wäre nun eine gute Stichprobe für meine Erhebungen verfügbar.",
        "Also vielen Dank. Du bist ein wahrer Held! Ein DHBW-Held!",
        "Im Hintergrund halfen dir übrigens einige fleißige Hände....",
        "Dalma Balogh, Katharina Barth, Julia Henschel, Kristin Zenger und last but not least Niklas Schikora",
        "Ganz tolle Studenten sind das!",
        "Vielleicht kannst du denen mal danke sagen.",
        "Die müssten auch hier in der DHBW sein....",
        "Bis bald!",
        "The End"
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
          this.scene.setCurentCounter();
          this.activeMission = null;
          this.clearInventory();
        }
      }
    }
    if (this.completedMissions.length == 3) {
      if (!this.inDoalogue) {
        setTimeout(this.runDialogue("credits"), 5000, this);
      }
      console.log(this.bubbleCount);
      console.log(text[this.bubbleCount]);
      if (text[this.bubbleCount] == "The End") {
        console.log("Start screen sollte kommen ? ");
        this.scene.scene.start("startScreen");
      }
    }
  }

  clearInventory() {
    var itembox = document.getElementById("inventar");
    itembox.innerHTML = "";
  }
}
