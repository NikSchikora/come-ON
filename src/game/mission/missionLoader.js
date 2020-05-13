import NPC from "../chars/npc";

//Array of all missions, add new missions by name here
const missions = [
  "masterMission",
  "maxMission",
  "donnaMission",
  "wirtMission",
  "eschMission",
  "mayaMission",
  "leoMission",
  "markMission"
];
const npcs = ["mester", "max", "donna", "wirt", "esch", "maya", "leo", "mark"];
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
      console.log("Loaded npc for mission " + npc + "!");
      //Load NPC-Data
      this.scene.load.json(npc + "Data", "npcs/" + npc + "/" + npc + ".json");
      //Load Sprite-Data
      this.scene.load.image(npc + "Sprite", "npcs/" + npc + "/" + npc + ".png");
    }, this);
  }

  create() {
    npcs.forEach(function createAssets(npc) {
      let data = this.scene.cache.json.get(npc + "Data");
      console.log(data + " for the Win!!");
      let char = new NPC(this.scene, data);
      console.log(char);
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
