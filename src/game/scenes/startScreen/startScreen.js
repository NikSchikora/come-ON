import Phaser from "../../engine/phaser.js";

let blinkingInterval;

export default class StartScreen extends Phaser.Scene {

    preload() {
        this.load.image("bg", "/startScene/bg.png");
        this.load.image("logo", "/startScene/titelbild_groesser.png");
        this.load.image("enter", "/startScene/press_enter.png");
        this.load.audio("startMusic", "../../../assets/startScene/Procession.mp3");
    }

    create() {
        let centerX = this.cameras.main.centerX;
        let centerY = this.cameras.main.centerY;
        this.add.image(centerX, centerY, "bg");
        this.add.image(
            centerX + 25,
            centerY - 130,
            "logo"
        );

        this.sfx = this.sound.add('startMusic', 
        {
            mute: false,
            volume: 0.1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        });

        this.sfx.play();
 
        let enter = this.add.image(
            centerX,
            centerY + 180,
            "enter"
        ).setScale(1.1, 1.1);


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
        let enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);  

        if (enterKey.isDown) {
            clearInterval(blinkingInterval);
            this.scene.start('playerSelector');
            this.sfx.stop();
        }

        
    }
}