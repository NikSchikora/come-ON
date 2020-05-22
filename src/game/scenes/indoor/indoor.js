import Phaser from "../../engine/phaser.js";
import Player from "../../chars/player.js";
import MissionLoader from "../../mission/missionLoader.js";

export default class Indoor extends Phaser.Scene {
  init(data) {
    this.playerSprite = data.player;
  }
  preload() {
    this.load.spritesheet("player", "mainScene/" + this.playerSprite + ".png", {
      frameWidth: 95,
      frameHeight: 176,
    });
    this.load.tilemapTiledJSON("indoorset-data", "indoor/map/dhbw.json");
    this.load.image("indoorset", "indoor/map/InteriorDHBW.png");

    //Load missions via MissionLoader
    this.loader = new MissionLoader(this);
    this.loader.preload();
    this.npcs = [];

  }

  create() {

    this.cameras.main.roundPixels = true;

    const indoor = this.make.tilemap({ key: "indoorset-data" });
    const indoorset = indoor.addTilesetImage("interiorDHBW", "indoorset");

    const backgroundLayer = indoor.createStaticLayer("Floor", indoorset, 0, 0);
    const wall = indoor.createStaticLayer("Wall", indoorset, 0, 0);
    const border = indoor.createStaticLayer("Border", indoorset, 0, 0);
    const tables = indoor.createStaticLayer("Tables", indoorset, 0, 0);
    const tables2 = indoor.createStaticLayer("Table2", indoorset, 0, 0);
    const seats = indoor.createStaticLayer("Seats", indoorset, 0, 0);
    const deko1 = indoor.createStaticLayer("Deko1", indoorset, 0, 0);
    const shelves = indoor.createStaticLayer("Shelves", indoorset, 0, 0);
    const deko2 = indoor.createStaticLayer("Deko2", indoorset, 0, 0);
    const balck = indoor.createStaticLayer("Balck", indoorset, 0, 0);

    // const firstBorder = map.createStaticLayer("firstBorder", tileset, 0, 0);
    wall.setCollisionByProperty({ collides: true });
    border.setCollisionByProperty({ collides: true });
    tables.setCollisionByProperty({ collides: true });
    tables2.setCollisionByProperty({ collides: true });
    // firstBorder.setCollisionByProperty({ collides: true });
    seats.setCollisionByProperty({ collides: true });
    deko1.setCollisionByProperty({ collides: true });
    shelves.setCollisionByProperty({ collides: true });
    balck.setCollisionByProperty({ collides: true });
    deko2.setCollisionByProperty({ collides: true });

    const spawnPoint = indoor.findObject(
      "playerObject",
      (obj) => obj.name === "StartingInterior"
    );

    const outside = indoor.findObject(
      "playerObject",
      (obj) => obj.name === "Outside"
    );

    console.log("here ist outside: " + outside);
    console.log("here ist spawnpoint: " + spawnPoint);

    console.log("spawn: " + spawnPoint.x + ":" + spawnPoint.y);
    // if (this.player == null) {
      this.player = new Player(
        this,
        spawnPoint.x,
        spawnPoint.y,
        0,
        0
      );
    // }
    console.log(this.player);
   

    const camera = this.cameras.main;
    camera.startFollow(this.player.sprite);
    camera.setBounds(0, 0, indoor.widthInPixels, indoor.heightInPixels);
    camera.setZoom(1.5);

    this.physics.add.collider(this.player.sprite, wall);
    this.physics.add.collider(this.player.sprite, border);
    this.physics.add.collider(this.player.sprite, tables);
    this.physics.add.collider(this.player.sprite, tables2);
    // this.physics.add.collider(this.player.sprite, firstBorder);
    this.physics.add.collider(this.player.sprite, seats);
    
    this.physics.add.collider(this.player.sprite, deko1);
    this.physics.add.collider(this.player.sprite, deko2);
    this.physics.add.collider(this.player.sprite, shelves);

    // this.player.body.x = spawnPoint.x;
    // this.player.body.y = spawnPoint.y;

    // this.loader.create();

    // this.setCounter();
    // this.setInventar();
    this.setCurentCounter();
  }

  update() {
    this.player.update();

    let enterKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    );
    if (enterKey.isDown) {
      this.player.closeDoor(this);
      console.log("lets go outside");
    }
  }

  setCurentCounter() {
    var counternumber = document.getElementById("counter");
    counternumber.innerHTML = "Danke fürs Spielen!";
  }
}
