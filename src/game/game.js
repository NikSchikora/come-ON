import Phaser from "./engine/phaser.js";
import StartScreen from "./scenes/startScreen/startScreen.js";
import MainScene from "./scenes/mainScene/mainScene.js";

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: "game-container",
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: MainScene
};
const game = new Phaser.Game(config);