const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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
    constructor( x, y, width, height ) {
        super(x,y,width, height);

        this.images=[];
    }

    update() {
        // a redefinir nas classes derivadas
    }

    draw() {
        ctx.drawImage(this.images[0], this.x, this.y, this.width, this.height); //default para uma imagem, redefinir nas classes derivadas caso seja necessarias mais,
    }                                                                           //adicionar argumentos para alterar indice de array

    load(...urlImages){ //método mitico de load a várias imagens
        let i=0;

        for(let url of urlImages){
            this.images.push(new Image());
            this.images[i].src=url;
            i++;
        }

        this.images.forEach(image =>{
            image.addEventListener("load", e=>{
                window.dispatchEvent( new CustomEvent('assetLoad', { detail: this }))
            })
        })
    }
}

class AnimatedSprite extends Sprite {

    static numberFrames;
    static numberFramesPerRow;
    static slice;

    constructor(x, y, width, height) {
        super(x, y, width, height);

        this.currentFrame = 1;

        this.sx = 0;
        this.sy = 0;
    }

    draw(index) {
        ctx.drawImage(this.images[index-1], this.sx, this.sy, this.slice.width, this.slice.height,
            this.x, this.y, this.width, this.height);
    }

    update() {

        this.currentFrame++;

        if (this.currentFrame > this.numberFrames)
            this.currentFrame = 1;

        let deltaX = (this.currentFrame - 1) % this.numberFramesPerRow;
        let deltaY = Math.floor((this.currentFrame - 1) / this.numberFramesPerRow);

        this.sx = deltaX * this.slice.width;
        this.sy = deltaY * this.slice.height;
    }

    load(numberFrames, numberFramesPerRow,...urlImages) {

        let i=0;

        for(let url of urlImages){
            this.images.push(new Image());
            this.images[i].src=url;
            i++;
        }

        this.images.forEach(image =>{
            image.addEventListener("load", e=>{
                //------------------------------------------//
            this.numberFrames = numberFrames;
            this.numberFramesPerRow = numberFramesPerRow;

            this.slice = {};
            this.slice.width = image.width / numberFramesPerRow;
            let numberRows = Math.ceil(numberFrames / numberFramesPerRow);
            this.slice.height = image.height / numberRows;
                //-------------------------------------------//
            window.dispatchEvent( new CustomEvent('assetLoad', { detail: this }))
            })
        })
        /*
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

        });*/

    }
}

class Level extends Sprite{
    constructor(x,y,width,height) {
        super(x,y,width,height);

        this.colisionsArray = [];

    }

    draw(level){
        ctx.drawImage(this.images[level-1], 0, 0, this.images[level-1].width,
            this.images[level-1].height, this.x, this.y, this.width, this.height);
    }
}

class Player extends Sprite{

    constructor(x,y,width,height) {
        super(x,y,width,height);

        this.level=1;
        this.direction="right";
        this.state=3; //animação do jogador consoante a sua direção
    }

    move(key){
        this.draw(this.state)
        this.update();

        if (this.x>canvas.width){
            this.x=200
            this.level++;
        }

        for (let i =0;i<key.length;i++) {
            if (key[i] == "s" && !structuresCollision(this.x,this.y +6,this.width,this.height)) {
                this.direction="down";
                player.state = 5;
                this.y += 6;
            }
            if (key[i] == "a" && !structuresCollision(this.x -6,this.y,this.width,this.height)) {
                this.direction="left"
                player.state = 6;
                this.x -= 6;
            }
            if (key[i]== "d" && !structuresCollision(this.x+6,this.y,this.width,this.height)) {
                this.direction="right"
                player.state = 7;
                this.x += 6;
            }
            if (key[i]== "w" && !structuresCollision(this.x,this.y -6,this.width,this.height)) {
                this.direction="up"
                player.state = 8;
                this.y -= 6;
            }

        }

    }

}


