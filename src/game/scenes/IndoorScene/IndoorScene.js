import Phaser from "../../engine/phaser.js";
import Player from "../../chars/player.js";
// import MissionLoader from "../../mission/missionLoader.js";

export default class MainScene extends Phaser.Scene {
  init(data) {
    this.playerSprite = data.player;
  }
  preload() {
    this.load.spritesheet("player", "IndoorScene/" + this.playerSprite + ".png", {
      frameWidth: 95,
      frameHeight: 176,
    });
    this.load.tilemapTiledJSON("map-data", "IndoorScene/map/dhbw.json");
    this.load.image("tileset", "mainScene/map/InteriorDGBW.png");

    //Load missions via MissionLoader
    // this.loader = new MissionLoader(this);
    // this.loader.preload();
    this.npcs = [];

    // this.load.audio("mainMusic", "startScene/No_Good_Right.mp3");
  }

  create() {
    // this.sfx2 = this.sound.add("mainMusic", {
    //   mute: false,
    //   volume: 0.1,
    //   rate: 1,
    //   detune: 0,
    //   seek: 0,
    //   loop: true,
    //   delay: 0,
    // });

    // this.sfx2.play();

    this.cameras.main.roundPixels = true;

    const map = this.make.tilemap({ key: "map-data" });
    const tileset = map.addTilesetImage("Tiles", "tileset");

    const backgroundLayer = map.createStaticLayer("Floor", tileset, 0, 0);
    const wall = map.createStaticLayer("Wall", tileset, 0, 0);
    const border = map.createStaticLayer("Border", tileset, 0, 0);
    const tables = map.createStaticLayer("Tables", tileset, 0, 0);
    const tables2 = map.createStaticLayer("Tables2", tileset, 0, 0);
    const seats = map.createStaticLayer("Seats", tileset, 0, 0);
    const deko1 = map.createStaticLayer("Deko1", tileset, 0, 0);
    const shelves = map.createStaticLayer("Shelves", tileset, 0, 0);
    const deko2 = map.createStaticLayer("Deko2", tileset, 0, 0);
    const balck = map.createStaticLayer("Balck", tileset, 0, 0);
    
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
   
    // const spawnPoint = map.findObject(
    //   "PersonObject",
    //   (obj) => obj.name === "StartingPoint"
    // );

    // const DHBW = map.findObject(
    //   "PersonObject",
    //   (obj) => obj.name === "DHBW"
    // );

    // console.log(DHBW);


    // console.log("spawn: " + spawnPoint.x + ":" + spawnPoint.y);

    this.player = new Player(this, 50, 50, 0 , 0);

    const camera = this.cameras.main;
    camera.startFollow(this.player.sprite);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
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

   

    // this.loader.create();

    // this.setCounter();
    // this.setInventar();
  }

  update() {
    this.player.update();
  }

 
}
