import Dialoque from "./dialogues/dialogues.js";

var img = new Image();
img.src = "../assets/startScene/titelbild_groesser.png";
var c = document.getElementById("myCanvas");
var dial = new Dialoque(c);
var texte = ["Hallo, ich bin Mester", "JA, keine Ahnung wo die alle sind", "HAHAHAHAHAHAHAHAHAHAA"];


var count = 0;
var textnumber = 0;
var btn = document.getElementById("btn");
var btnClear = document.getElementById("btnClear");
var div = document.getElementById("speech");

window.addEventListener('click', () =>{
    c.style.display = 'block';
    dial.clear();

    if(textnumber > texte.length-1){
        c.style.display = 'none';
    }else{
        dial.draw(img, "Prof. Dr. Mester", texte[textnumber]);
        textnumber++;
        }
    }
)

btnClear.addEventListener('click', () =>{
    dial.clear();
})