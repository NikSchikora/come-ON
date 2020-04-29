import Phaser from "../../engine/phaser.js";

let blinkingInterval;

export default class PlayerSelector extends Phaser.Scene {

    preload() {
        this.load.image("background", "playerSelector/bg.png");
        this.load.image("select", "playerSelector/bg_select.png");
        this.load.image("arrow", "playerSelector/arrow.png");
        this.load.image("enter", "playerSelector/press_enter.png");

        //Player-Previews
        this.load.image("player_wirth", "playerSelector/players/prev_wirth.png");
        this.load.image("player_male", "playerSelector/players/prev_male.png");
        this.load.image(
            "player_female",
            "playerSelector/players/prev_female.png"
        );


        this.players = [];
        this.currentShown = 0;
        this.rightButton = null;
        this.leftButton = null;
    }

    create() {
        this.add.image(0, 0, "background").setOrigin(0, 0);
        this.players.push(
            this.add
                .image(
                    this.cameras.main.centerX,
                    this.cameras.main.centerY + 40,
                    "player_male"
                )
                .setScale(0.6, 0.6)
        );
        this.players.push(
            this.add
                .image(
                    this.cameras.main.centerX + 300,
                    this.cameras.main.centerY + 40,
                    "player_female"
                )
                .setScale(0.6, 0.6)
        );
        this.players.push(
            this.add
                .image(
                    this.cameras.main.centerX + 600,
                    this.cameras.main.centerY + 40,
                    "player_wirth"
                )
                .setScale(0.6, 0.6)
        );
        this.add.image(0, 0, "select").setOrigin(0, 0);
        let arrowRight = this.add.image(
            this.cameras.main.centerX + 160,
            this.cameras.main.centerY,
            "arrow"
        );
        arrowRight.setOrigin(0.5, 0.5);
        this.rightButton = arrowRight;
        let arrowLeft = this.add.image(
            this.cameras.main.centerX - 160,
            this.cameras.main.centerY,
            "arrow"
        );

        let enter = this.add.image(
            this.cameras.main.centerX,
            this.cameras.main.centerY + 250,
            "enter"
        ).setScale(1.1, 1.1);

        arrowLeft.setOrigin(0.5, 0.5);
        arrowLeft.rotation = 3.15;
        this.leftButton = arrowLeft;
        this.cursors = this.input.keyboard.createCursorKeys();

        let enterVisible = true;
        blinkingInterval = setInterval(blink, 1000);

        function blink() {
            if (enterVisible) {
                enter.visible = false;
                enterVisible = false;
            }
            else {
                enter.visible = true;
                enterVisible = true;
            }
        }

    }
    update() {
        let players = this.players;
        let currentShown = this.currentShown;
        let cursors = this.cursors;

        if (cursors.space.isDown) {
            this.scene.start("mainScene", { player: "char1" });
        }

        if (Phaser.Input.Keyboard.JustDown(cursors.right)) {
            if (currentShown < players.length - 1) {
                players.forEach(function (item) {
                    this.tweens.add({
                        targets: item,
                        x: item.x - 300,
                        duration: 500,
                        ease: "Power1",
                        repeat: 0,
                    }, this);
                }, this);
                currentShown++;
                this.currentShown = currentShown;
            }
        } else if (Phaser.Input.Keyboard.JustDown(cursors.left)) {
            if (currentShown > 0) {
                players.forEach(function (item) {
                    this.tweens.add({
                        targets: item,
                        x: item.x + 300,
                        duration: 500,
                        ease: "Power1",
                        repeat: 0,
                    }, this);
                }, this);
                currentShown--;
                this.currentShown = currentShown;
            }
        }
    }
}