import NPC from "../chars/npc";
import Mission from "./mission";

//Array of all missions, add new missions by name here
const missions = [
  "exampleMission",
  "maxMission",
  "donnaMission",
  "wirtMission",
];
const npcs = ["mester", "max", "donna", "wirt"];
let missioncounter;

export default class MissionLoader {
  constructor(scene) {
    this.missioncounter = 0;
    this.scene = scene;
    this.npcList = [];
  }

  preload() {
    //Loaad missions from array
    missions.forEach(function iterateMissions(mission) {
      //Load JSONS
      this.scene.load.json(
        mission + "Data",
        "missions/" + mission + "/" + mission + ".json"
      );
      //Load assets
      this.scene.load.image(
        mission + "Sprite",
        "missions/" + mission + "/sprite.png"
      );
      console.log("Loaded assets for mission " + mission + "!");
    }, this);
    //Load NPCS from array
    npcs.forEach(function iterateNPCS(npc) {
      //Load NPC-Data
      this.scene.load.json(npc + "Data", "npcs/" + npc + "/" + npc + ".json");
      //Load Sprite-Data
      this.scene.load.image(npc + "Sprite", "npcs/" + npc + "/" + npc + ".png");
    }, this);
  }

  create() {
    npcs.forEach(function (npc) {
      let data = this.scene.cache.json.get(npc + "Data");
      let char = new NPC(this.scene, data);
      this.npcList.push(char);
    }, this);
  }

  getNpcByName(name) {
    let retValue = null;
    this.npcList.forEach(function (iteration) {
      if (iteration.data.name == name) {
        retValue = iteration;
      }
    }, this);
    return retValue;
  }
}
