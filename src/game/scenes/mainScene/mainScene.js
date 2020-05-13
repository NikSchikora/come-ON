import Phaser from "../../engine/phaser.js";
import Player from "../../chars/player.js";
import MissionLoader from "../../mission/missionLoader.js";

export default class MainScene extends Phaser.Scene {
  init(data) {
    this.playerSprite = data.player;
  }
  preload() {
    this.load.spritesheet("player", "mainScene/" + this.playerSprite + ".png", {
      frameWidth: 95,
      frameHeight: 176,
    });
    this.load.tilemapTiledJSON("map-data", "mainScene/map/Map5.json");
    this.load.image("tileset", "mainScene/map/TileSheet32.png");

    //Load missions via MissionLoader
    this.loader = new MissionLoader(this);
    this.loader.preload();
    this.npcs = [];
    this.missions = [];

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

    const backgroundLayer = map.createStaticLayer("Gras", tileset, 0, 0);
    const streetsLayer = map.createStaticLayer("Streets", tileset, 0, 0);
    const buildingsLayer = map.createStaticLayer("Buildings", tileset, 0, 0);
    const dhbwLayer = map.createStaticLayer("DHBW", tileset, 0, 0);
    const rocks = map.createStaticLayer("Rocks", tileset, 0, 0);
    const forest = map.createStaticLayer("Forest", tileset, 0, 0);
    const rightborder = map.createStaticLayer("rightborder", tileset, 0, 0);
    const water = map.createStaticLayer("Water", tileset, 0, 0);
    const island = map.createStaticLayer("island", tileset, 0, 0);
    const water2 = map.createStaticLayer("Water2", tileset, 0, 0);
    const water3 = map.createStaticLayer("Water3", tileset, 0, 0);
    const decoLayer1 = map.createStaticLayer("Deco1", tileset, 0, 0);
    const bridges = map.createStaticLayer("Bridges", tileset, 0, 0);
    const leftborder = map.createStaticLayer("leftborder", tileset, 0, 0);
    const decoLayer2 = map.createStaticLayer("Deco2", tileset, 0, 0);
    const overflowLayer0 = map.createStaticLayer("Overflow0", tileset, 0, 0);
    const overflowLayer1 = map.createStaticLayer("Overflow", tileset, 0, 0);
    const overflowLayer2 = map.createStaticLayer("Overflow2", tileset, 0, 0);
    const overflowLayer3 = map.createStaticLayer("Overflow3", tileset, 0, 0);
    const overflowLayer4 = map.createStaticLayer("Overflow4", tileset, 0, 0);
    const cave = map.createStaticLayer("Cave", tileset, 0, 0);
    // const firstBorder = map.createStaticLayer("firstBorder", tileset, 0, 0);
    buildingsLayer.setCollisionByProperty({ collides: true });
    dhbwLayer.setCollisionByProperty({ collides: true });
    decoLayer1.setCollisionByProperty({ collides: true });
    decoLayer2.setCollisionByProperty({ collides: true });
    // firstBorder.setCollisionByProperty({ collides: true });
    overflowLayer0.setCollisionByProperty({ collides: true });
    overflowLayer1.setCollisionByProperty({ collides: true });
    overflowLayer2.setCollisionByProperty({ collides: true });
    overflowLayer3.setCollisionByProperty({ collides: true });
    overflowLayer4.setCollisionByProperty({ collides: true });
    water.setCollisionByProperty({ collides: true });
    water2.setCollisionByProperty({ collides: true });
    water3.setCollisionByProperty({ collides: true });
    rocks.setCollisionByProperty({ collides: true });
    forest.setCollisionByProperty({ collides: true });
    cave.setCollisionByProperty({ collides: true });
    

    const spawnPoint = map.findObject(
      "PersonObject",
      (obj) => obj.name === "StartingPoint"
    );
    console.log("spawn: " + spawnPoint.x + ":" + spawnPoint.y);

    this.player = new Player(this, spawnPoint.x, spawnPoint.y);

    const camera = this.cameras.main;
    camera.startFollow(this.player.sprite);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    camera.setZoom(1.5);

    this.physics.add.collider(this.player.sprite, buildingsLayer);
    this.physics.add.collider(this.player.sprite, dhbwLayer);
    this.physics.add.collider(this.player.sprite, decoLayer1);
    this.physics.add.collider(this.player.sprite, decoLayer2);
    // this.physics.add.collider(this.player.sprite, firstBorder);
    this.physics.add.collider(this.player.sprite, overflowLayer0);
    this.physics.add.collider(this.player.sprite, overflowLayer1);
    this.physics.add.collider(this.player.sprite, overflowLayer2);
    this.physics.add.collider(this.player.sprite, overflowLayer3);

    this.physics.add.collider(this.player.sprite, rocks);
    this.physics.add.collider(this.player.sprite, forest);
    this.physics.add.collider(this.player.sprite, water3);
    this.physics.add.collider(this.player.sprite, water);
    this.physics.add.collider(this.player.sprite, water2);
    this.physics.add.collider(this.player.sprite, cave);

    this.loader.create();

    this.setCounter();
    this.setInventar();
  }

  update() {
    this.player.update();
  }

  setCounter() {
    console.log("counter ahoi!");
    var counter = this.loader.missioncounter;
    var counterbox = document.getElementById("counterbox");
    var counternumber = document.getElementById("counter");
    counternumber.innerHTML = counter;
    counterbox.style.visibility = "visible";
  }

  setInventar() {
    console.log("inventar ahoi!");
    var inventarbox = document.getElementById("inventarbox");
    inventarbox.style.visibility = "visible";
  }
}
