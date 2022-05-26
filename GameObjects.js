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



