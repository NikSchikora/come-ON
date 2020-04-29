import Phaser from "./engine/phaser.js";
import StartScreen from "./scenes/startScreen/startScreen.js";
import MainScene from "./scenes/mainScene/mainScene.js";
import PlayerSelector from "./scenes/playerSelector/playerSelector.js";

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
    scene: StartScreen
};
const game = new Phaser.Game(config);
let playerSelector = game.scene.add("playerSelector", PlayerSelector, false);
let mainScene = game.scene.add("mainScene", MainScene, false);