export function IsNearLocation(player) {
  let p = player.sprite;
  let missionObject = player.getCurrentMission().object;
  if (p.x <= missionObject.x - 5 || p.x >= missionObject.x + 5) {
    if (p.y <= missionObject.y - 5 || p.y >= missionObject.y + 5) {
      return true;
    }
  }
  return false;
}
