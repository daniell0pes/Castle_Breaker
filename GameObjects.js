const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

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
        ctx.drawImage(this.levelsArray[level-1], 0, 0, level.width, level.height, this.x, this.y, this.width, this.height);
    }

    load(...urlImages){

        for(let url of urlImages){
            let i=0;
            this.levelsArray.push(new Image());
            this.levelsArray[i].src=url;
            i++;
        }

        //Sprite.imagem = new Image();

        this.levelsArray.forEach(level =>{
            level.addEventListener("load", e=>{
                window.dispatchEvent( new CustomEvent('assetLoad', { detail: this }))
            })
        })

        //Sprite.imagem.src = urlImagem;
    }
}



