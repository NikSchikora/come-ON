import Phaser from "../engine/phaser.js";

export default class Player {

    constructor(scene, x, y) {
        this.scene = scene;

        const anims = scene.anims;

        anims.create({
            key: "walk-right",
            frames: anims.generateFrameNumbers("player", { start: 0, end: 1 }),
            frameRate: 5,
            repeat: 0,
        });
        anims.create({
            key: "walk-left",
            frames: anims.generateFrameNumbers("player", { start: 2, end: 3 }),
            frameRate: 5,
            repeat: 0,
        });
        anims.create({
            key: "walk-front",
            frames: anims.generateFrameNumbers("player", { start: 4, end: 5 }),
            frameRate: 5,
            repeat: 0,
        });
        anims.create({
            key: "walk-back",
            frames: anims.generateFrameNumbers("player", { start: 6, end: 7 }),
            frameRate: 5,
            repeat: 0,
        });

        this.sprite = scene.physics.add.sprite(x, y, "player", 0).setScale(.09, .09);

        this.keys = scene.input.keyboard.createCursorKeys();

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

    }
}