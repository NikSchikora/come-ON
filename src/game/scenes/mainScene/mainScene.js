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
    this.load.tilemapTiledJSON("map-data", "mainScene/map/Map2.json");
    this.load.image("tileset", "mainScene/map/TileSheet32.png");

    //Load missions via MissionLoader
    this.loader = new MissionLoader(this);
    this.loader.preload();
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

    const backgroundLayer = map.createStaticLayer("Gras", tileset, 0, 0);
    const streetsLayer = map.createStaticLayer("Streets", tileset, 0, 0);
    const buildingsLayer = map.createStaticLayer("Buildings", tileset, 0, 0);
    const dhbwLayer = map.createStaticLayer("DHBW", tileset, 0, 0);
    const decoLayer1 = map.createStaticLayer("Deco1", tileset, 0, 0);
    const decoLayer2 = map.createStaticLayer("Deco2", tileset, 0, 0);
    const overflowLayer = map.createStaticLayer("Overflow", tileset, 0, 0);
    const firstBorder = map.createStaticLayer("firstBorder", tileset, 0, 0);
    buildingsLayer.setCollisionByProperty({ collides: true });
    dhbwLayer.setCollisionByProperty({ collides: true });
    decoLayer1.setCollisionByProperty({ collides: true });
    decoLayer2.setCollisionByProperty({ collides: true });
    firstBorder.setCollisionByProperty({ collides: true });
    overflowLayer.setCollisionByProperty({ collides: true });

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
    this.physics.add.collider(this.player.sprite, firstBorder);
    this.physics.add.collider(this.player.sprite, overflowLayer);

    this.loader.create();

    this.setCounter();
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
}
