const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');
let keys = [];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var tile = {
    width : canvas.width/30,
    height : canvas.height/20
}

class GameObject extends EventTarget { //EventTarget por causa dos listeners

    constructor( x, y, width, height ) {
        super();

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    update() {
        // a redefinir nas classes derivadas
    }

    draw() {
        // a redefinir nas classes derivadas
    }
}

class Sprite extends GameObject {

    static imagem;

    constructor( x, y, width, height ) {
        super(x,y,width, height);
    }

    update() {
        // a redefinir nas classes derivadas
    }

    draw() {
        //ctx.drawImage( Sprite.imagem, this.x, this.y, this.width, this.height);
    }

    static load(urlImagem) {
        Sprite.imagem = new Image();

        Sprite.imagem.addEventListener( "load", e=> {
            window.dispatchEvent( new CustomEvent('assetLoad', { detail: this }))
        });

        Sprite.imagem.src = urlImagem;
    }
}

class AnimatedSprite extends Sprite {

    static numberFrames;
    static numberFramesPerRow;
    static slice;
    //static direction="right";

    constructor(x, y, width, height) {
        super(x, y, width, height);

        this.currentFrame = 1;

        this.sx = 0;
        this.sy = 0;
    }

    draw() {

        ctx.drawImage(this.constructor.imagem, this.sx, this.sy, this.constructor.slice.width, this.constructor.slice.height,
            this.x, this.y, this.width, this.height);
    }

    update() {

        this.currentFrame++;

        if (this.currentFrame > this.constructor.numberFrames)
            this.currentFrame = 1;

        let deltaX = (this.currentFrame - 1) % this.constructor.numberFramesPerRow;
        let deltaY = Math.floor((this.currentFrame - 1) / this.constructor.numberFramesPerRow);

        this.sx = deltaX * this.constructor.slice.width;
        this.sy = deltaY * this.constructor.slice.height;
    }

    static load(urlImagem, numberFrames, numberFramesPerRow) {

        this.imagem = new Image(); //instanciar o objeto imagem

        this.imagem.src = urlImagem; //dizer que a src da imagem é urlImagem

        this.imagem.addEventListener('load', () => {

            this.numberFrames = numberFrames;
            this.numberFramesPerRow = numberFramesPerRow;

            this.slice = {};
            this.slice.width = this.imagem.width / numberFramesPerRow;

            let numberRows = Math.ceil(numberFrames / numberFramesPerRow);
            this.slice.height = this.imagem.height / numberRows;

            window.dispatchEvent(new CustomEvent('assetLoad', { detail: this }));

        });

    }

}

class Level extends Sprite{
    constructor(x,y,width,height) {
        super(x,y,width,height);

        this.levelsArray = [];
        this.colisionsArray = [];

    }

    draw(level){
        ctx.drawImage(this.levelsArray[level-1], 0, 0, this.levelsArray[level-1].width,
            this.levelsArray[level-1].height, this.x, this.y, this.width, this.height);
    }

    load(...urlImages){ //método mitico de load a várias imagens
        let i=0;
        for(let url of urlImages){
            this.levelsArray.push(new Image());
            this.levelsArray[i].src=url;
            i++;
            console.log(i);
        }

        this.levelsArray.forEach(level =>{
            level.addEventListener("load", e=>{
                window.dispatchEvent( new CustomEvent('assetLoad', { detail: this }))
            })
        })

    }
}

class Player extends Sprite{

    constructor(x,y,width,height) {
        super(x,y,width,height);

        this.level=1;
    }


    draw() {
        ctx.drawImage(Sprite.imagem,this.x,this.y,this.width,this.height)
    }

    move(key){
        this.draw()

        if (this.x>canvas.width){
            this.x=200
            this.level++;
        }

        for (let i =0;i<key.length;i++) {
            if (key[i] == "d") {
                this.x += 3;
            }
            if (key[i] == "w") {
                this.y -= 3;
            }
            if (key[i]== "a") {
                this.x -= 3;
            }
            if (key[i]== "s") {
                this.y += 3;

            }

        }

    }

}
let existe=false;
addEventListener("keyup", event=>{
    for (let i =0; i<keys.length;i++){

        if (keys[i] == event.key){
            existe=false;
            keys.splice(i,1);
        }
    }


})

window.addEventListener('keydown',event=>{

    for (let i =0; i<keys.length;i++){
        if (keys[i] == event.key){
            existe=true;
        }
        else{
            existe=false
        }
    }
    if (!existe){

        keys.push(event.key);
    }
});


