import Phaser from "./engine/phaser.js";
import StartScreen from "./scenes/startScreen/startScreen.js";
import MainScene from "./scenes/mainScene/mainScene.js";
import PlayerSelector from "./scenes/playerSelector/playerSelector.js";
import Indoor from "./scenes/indoor/indoor.js";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "game-container",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
    },
  },
  scene: StartScreen,
};
const game = new Phaser.Game(config);
let startScreen = game.scene.add("startScreen", StartScreen, false);
let playerSelector = game.scene.add("playerSelector", PlayerSelector, false);
let mainScene = game.scene.add("mainScene", MainScene, false);
let indoor = game.scene.add("indoor", Indoor, false);
