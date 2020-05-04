import Dialoque from "./dialogues/dialogues.js";

var dial = new Dialoque(400, 500, 200, 100);


var btn = document.getElementById("btn");
var div = document.getElementById("speech");

btn.addEventListener('click', ()=>{
    dial.createSpeechBubble(400, 500, 200, 100, "hallo du da, ich bin toll");
})