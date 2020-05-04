//Array of all missions, add new missions by name here
const missions = ["exampleMission"];
export default class MissionLoader {
  constructor(scene) {
    this.scene = scene;
  }

  preload() {
    //Loaad missions from array
    missions.forEach(function iterateMissions(mission) {
      //Load JSONS
      this.scene.load.json(
        mission,
        "missions/" + mission + "/" + mission + ".json"
      );
      //Load assets
      this.scene.load.image(
        mission + "Object",
        "missions/" + mission + "/sprite.png"
      );
      console.log("Loaded assets for mission " + mission + "!");
    }, this);
  }
}
