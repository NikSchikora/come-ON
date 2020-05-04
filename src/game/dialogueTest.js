import Dialoque from "./dialogues/dialogues.js";

var img = new Image();
img.src = "../assets/startScene/titelbild_groesser.png";
var c = document.getElementById("myCanvas");
var dial = new Dialoque(c);

var count = 0;
var btn = document.getElementById("btn");
var btnClear = document.getElementById("btnClear");
var div = document.getElementById("speech");

btn.addEventListener('click', () =>{
    count++;
    if(count%2 == 0){
        dial.clear();
    }else{
         dial.draw(img, "Prof. Dr. Mester", "Hallo, ich bin Mester");
    }
   
})

btnClear.addEventListener('click', () =>{
    dial.clear();
})