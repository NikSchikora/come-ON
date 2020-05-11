import Phaser from "../engine/phaser.js";

export default class Sounds {
    constructor(scene) {
        this.scene = scene;
      }

  preload(){
    this.load.audio("pickUpSound", "../../../playerSelector/shooting_star-Mike_Koenig-1132888100.mp3");
  }


  pickUp(scene){
    this.pickUp = this.scene.add("pickUpSound", {
        mute: false,
        volume: 0.1,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: false,
        delay: 0,
      });
  
      scene.pickUp.play();
      console.log("sound!!!!Class Sound");
  }
}
