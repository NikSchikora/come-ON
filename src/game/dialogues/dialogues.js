import Phaser from "../engine/phaser.js";

let c, ctx

export default class Dialogue {

    constructor(c) {
        this.c = c;
        this.ctx = c.getContext("2d");
    }

    draw(img , name, quote){
    
        this.ctx.font = "bold 20px Arial";
        this.ctx.fillText(name, 100, 20)
        this.ctx.font = "20px Arial";
        this.ctx.fillText(quote, 100, 50);
        this.ctx.drawImage(img, 0, 5, 100 , 90);
        
    }

    clear(){
        this.ctx.clearRect(0, 0, this.c.width, this.c.height);
    }
    

}





   