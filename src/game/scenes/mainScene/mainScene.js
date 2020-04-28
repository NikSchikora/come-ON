import Phaser from "../../engine/phaser.js";

export default class MainScene extends Phaser.Scene {

    preload() {
        this.load.spritesheet("player_fem", "mainScene/char_fem.png", {
            frameWidth: 208,
            frameHeight: 384,
        });

        this.load.tilemapTiledJSON("map-data", "mainScene/map/Map2.json");
        this.load.image("tileset", "mainScene/map/TileSheet32.png");
    }

    create() {
        this.cameras.main.roundPixels = true;

        const map = this.make.tilemap({ key: "map-data" });
        const tileset = map.addTilesetImage("Tiles", "tileset");

        const backgroundLayer = map.createStaticLayer("Gras", tileset, 0, 0);
        const streetsLayer = map.createStaticLayer("Streets", tileset, 0, 0);
        const buildingsLayer = map.createStaticLayer("Buildings", tileset, 0, 0);
        const dhbwLayer = map.createStaticLayer("DHBW", tileset, 0, 0);
        const decoLayer1 = map.createStaticLayer("Deco1", tileset, 0, 0);
        const decoLayer2 = map.createStaticLayer("Deco2", tileset, 0, 0);
        const firstBorder = map.createStaticLayer("firstBorder", tileset, 0, 0);
        const overflowLayer = map.createStaticLayer("Overflow", tileset, 0, 0);
        buildingsLayer.setCollisionByProperty({ collides: true });
        dhbwLayer.setCollisionByProperty({ collides: true });
        decoLayer1.setCollisionByProperty({ collides: true });
        decoLayer2.setCollisionByProperty({ collides: true });
        firstBorder.setCollisionByProperty({ collides: true });
        overflowLayer.setCollisionByProperty({ collides: true });

        const spawnPoint = map.findObject("PersonObject", obj => obj.name === "StartingPoint");

        this.cameras.main.setZoom(2);

        let player = this.physics.add
            .sprite(spawnPoint.x, spawnPoint.y, "player_fem")
            .setScale(0.08, 0.08);
        this.player = player;

        this.physics.add.collider(this.player, buildingsLayer);
        this.physics.add.collider(this.player, dhbwLayer);
        this.physics.add.collider(this.player, decoLayer1);
        this.physics.add.collider(this.player, decoLayer2);
        this.physics.add.collider(this.player, firstBorder);
        this.physics.add.collider(this.player, overflowLayer);

        //Animations from Sprite
        const anims = this.anims;
        anims.create({
            key: "fem_right",
            frames: anims.generateFrameNumbers("player_fem", { start: 0, end: 1 }),
            frameRate: 5,
            repeat: 0,
        });
        anims.create({
            key: "fem_left",
            frames: anims.generateFrameNumbers("player_fem", { start: 2, end: 3 }),
            frameRate: 5,
            repeat: 0,
        });
        anims.create({
            key: "fem_front",
            frames: anims.generateFrameNumbers("player_fem", { start: 4, end: 5 }),
            frameRate: 5,
            repeat: 0,
        });
        anims.create({
            key: "fem_back",
            frames: anims.generateFrameNumbers("player_fem", { start: 6, end: 7 }),
            frameRate: 5,
            repeat: 0,
        });
        const camera = this.cameras.main;
        camera.startFollow(this.player);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    }

    update() {

    }

}