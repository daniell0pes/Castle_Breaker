const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
/*
Definição e atribuição da API canvas
*/

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

/*
GameObject, objetos de jogo
 */

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
                window.dispatchEvent( new CustomEvent('assetLoad', { detail: e }))
            })
        })
    }
}

/*
Objetos que derivem desta classe vão conter imagens estáticas
 */

class AnimatedSprite extends Sprite {
    constructor(x, y, width, height) {
        super(x, y, width, height);

        this.currentFrame = 1;

        this.sx = 0;
        this.sy = 0;

        this.numberFrames=0;
        this.numberFramesPerRow=0;
        this.slice=0;

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

    load(numberFrames, numberFramesPerRow,array,...urlImages) {

        let i=0;

        for(let url of urlImages){
            array.push(new Image());
                array[i].src=url;
            i++;
        }

        array.forEach(image =>{
            image.addEventListener("load", e=>{
                console.log("loaded: " + image.src)
                //------------------------------------------//
            this.numberFrames = numberFrames;
            this.numberFramesPerRow = numberFramesPerRow;

            this.slice = {};
            this.slice.width = image.width / numberFramesPerRow;
            let numberRows = Math.ceil(numberFrames / numberFramesPerRow);
            this.slice.height = image.height / numberRows;
                //-------------------------------------------//
            window.dispatchEvent( new CustomEvent('assetLoad', { detail: e }))
            })
        })
    }
}

/*
AnimatedSprite, classes derivadas vão conter imagens animadas
 */

class Level extends Sprite{
    constructor(x,y,width,height) {
        super(x,y,width,height);
        this.colisionsArray = levels[0];
    }

    draw(level) {
        ctx.drawImage(this.images[level - 1], 0, 0, this.images[level - 1].width,
            this.images[level - 1].height, this.x, this.y, this.width, this.height);
        //this.colisionsArray = levels[level-1];

    }
    init(level){
        this.colisionsArray = levels[level-1];
    }
}

/*
Level, é uma classe usada para o desenho dos niveis
 */

class Player extends AnimatedSprite{

    constructor(x,y,width,height) {
        super(x,y,width,height);
        this.level=1;
        this.direction="right";
        this.state=3; //animação do jogador consoante a sua direção
        this.life=100
        this.maxLife=100
        this.inventory=[];
        this.damage=10;
        this.positionArray={
            x:0,
            y:0
        }
    }

    move(key){
        this.draw(this.state)
        this.update();

        if (this.x>canvas.width){
            this.x=200
            this.level++;
        }

        //ctx.fillRect(this.x+37,this.y+37,this.width-75,this.height-75)

        for (let i =0;i<key.length;i++) {
            if (key[i] === "s" && !structuresCollision(this.x+37,this.y+37+6,this.width-75,this.height-75,player)) {
                this.direction="down";
                player.state = 5;
                this.y += 6;
            }
            if (key[i] === "a" && !structuresCollision(this.x+37-6,this.y+37,this.width-75,this.height-75,player)) {
                this.direction="left"
                player.state = 6;
                this.x -= 6;
            }
            if (key[i]=== "d" && !structuresCollision(this.x+37+6,this.y+37,this.width-75,this.height-75,player)) {
                this.direction="right"
                player.state = 7;
                this.x += 6;
            }
            if (key[i]=== "w" && !structuresCollision(this.x+37,this.y+37-6,this.width-75,this.height-75,player)) {
                this.direction="up"
                player.state = 8;
                this.y -= 6;
            }

        }

    }

}

/*
Classe Player, é a classe que contém o jogador bem como os seus métodos, movimentado pelo o utilizador.
 */

class playerStance extends Player{
    constructor(x,y,width,height) {
        super(x,y,width,height);
        this.attacks=[];
    }

    draw(index) {
        ctx.drawImage(this.images[index-1], this.sx, this.sy, this.slice.width, this.slice.height,
            player.x, player.y, this.width, this.height);
    }

    attack(){
        this.attacks.push(new Attack(player.x,player.y,50,150))
        attackDirection(this.attacks[this.attacks.length-1]);
        attackToEnemy()
    }
}
/*
Classe playerStance faz parte do jogador e é definida de forma a que o jogador tenha um comportamento diferente durante a batalha com os inimigos
 */

class Inventory extends Sprite {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.activated = false;
    }

    allowInventory(key) {
        if(key==="i"){
            this.activated = !this.activated;
        }
    }

    drawInventory(){
        if (this.activated) {
            this.draw();
            player.inventory.forEach((item,index) =>{
                item.draw(index+1);
            })
            selection.draw();
            selection.checks.forEach(check =>{
                check.draw();
            })
        }
    }
}

/*
Inventário do jogador, armazena itens que o jogador vá recolhendo ao longo do jogo
 */

// Non Playable Character
class Npc extends AnimatedSprite{
    constructor(x,y,width,height) {
        super(x,y,width,height);

    }
}

/*
    Simples desenho de uma criatura usada para interagir com o jogador
 */

class Interact extends Sprite{
    constructor(x,y,width,height) {
        super(x,y,width,height);

    this.interactAction = false
    }

    update() {
        if (this.interactAction){
        this.draw()
        this.x=player.x
        this.y=player.y
        }
    }

}

/*
Definição de interação do jogador com objetos e NPC´s.
 */

class Attack extends GameObject{
    constructor(x,y,width,height) {
        super(x,y,width,height);

    }
    drawCollision() {
        ctx.fillRect(this.x,this.y,this.width,this.height)
    }

}

/*
Classe que é instanciada cada vez que o jogador faz um ataque de forma a ter forma de registar colisão dos mesmos com os inimigos
 */

class Dialog extends Sprite{
    constructor(x,y,width,height){
        super(x,y,width,height);

        this.dialog="";
        this.activated=false;
    }

    draw(){
        super.draw();
        ctx.font = "22px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(this.dialog, this.x+(canvas.width*20)/1536, this.y+this.height/2);
    }

    changeText(dialog_array,index,key){
        if(this.activated && key){
        }
    }
}
/*
Classe em desenvolvimento..., o propósito da mesma era criar caixas de diálogo com os NPC´s
 */


class Enemy extends AnimatedSprite{
    constructor(x,y,width,height,life,damage,radius,boss) {
        super(x,y,width,height)
        this.damage = damage;
        this.life=life
        this.maxLife=life
        this.radius=radius
        this.goAfter=false
        this.attacks=[]
        this.attackTimeout=false;
        this.direction = "down";
        this.spriteIndex=4;
        this.positionArray={
            x:10,
            y:10
        }
        this.boss = boss
    }
    idle(){
        this.draw(5);
        this.update();
        if (collision(player.x+player.width/4,player.y +player.height/4,player.width-player.width/2,player.height-player.height/2,this.x-this.radius/1.5,this.y-this.radius/1.5,this.radius*3,this.radius*3)){
            this.goAfter=true
        }
    }

    chase(angle){

        this.draw(this.spriteIndex)
        this.update();

        console.log(this.direction+ " " +this.spriteIndex);

        if (collision(player.x+player.width/4,player.y +player.height/4,player.width-player.width/2,player.height-player.height/2,this.x+this.width/4,this.y+this.height/4,this.width-this.width/2,this.height-this.height/2)){
            this.attack()

        }
         else
         {
             if (!structuresCollision(this.x + Math.cos(angle) * 2 +this.width/4,this.y + Math.sin(angle) * 2 +this.height/4  ,this.width -this.width/2,this.height-this.height/2,enemy)) {
                 this.x += Math.cos(angle) * 2
                 this.y += Math.sin(angle) * 2
                 if (quadrantePlayerAoInimigo() == 1 || quadrantePlayerAoInimigo() == 4) {
                     this.direction = "right";
                     this.spriteIndex = 3;
                 } else if (quadrantePlayerAoInimigo() == 2 || quadrantePlayerAoInimigo() == 3) {
                     this.direction = "left";
                     this.spriteIndex = 2;
                 }
             }
             else{
                 if (quadrantePlayerAoInimigo()==3||quadrantePlayerAoInimigo()==4){

                    if (rightPathPossible(this.positionArray.x,this.positionArray.y-1) <= leftPathPossible(this.positionArray.x,this.positionArray.y-1)){
                        if (structuresCollision(this.x+this.width/4 ,this.y + 2 +this.height/4  ,this.width-this.width/2,this.height-this.height/2,enemy)){
                        this.x +=2
                            this.direction="right";
                            this.spriteIndex=3;
                        }
                    }
                    if (rightPathPossible(this.positionArray.x,this.positionArray.y-1) > leftPathPossible(this.positionArray.x,this.positionArray.y-1)){
                        if (structuresCollision(this.x+this.width/4 ,this.y + 2 +this.height/4  ,this.width-this.width/2,this.height-this.height/2,enemy)){
                            this.x -=2
                            this.direction="left";
                            this.spriteIndex=2;
                        }
                    }
                    if (!structuresCollision(this.x+this.width/4 ,this.y + 2 +this.height/4  ,this.width-this.width/2,this.height-this.height/2,enemy)){
                        this.y+=2
                        this.direction="down";
                        this.spriteIndex=1;
                    }

                 }
                 if (quadrantePlayerAoInimigo()==1||quadrantePlayerAoInimigo()==2){

                     if (rightPathPossible(this.positionArray.x,this.positionArray.y-4) <= leftPathPossible(this.positionArray.x,this.positionArray.y-4)){
                         if (structuresCollision(this.x+this.width/4 ,this.y - 2 +this.height/4  ,this.width-this.width/2,this.height-this.height/2,enemy)){
                             this.x +=2
                             this.direction="right";
                             this.spriteIndex=3;
                         }

                     }
                     if (rightPathPossible(this.positionArray.x,this.positionArray.y-4) > leftPathPossible(this.positionArray.x,this.positionArray.y-4)){
                         if (structuresCollision(this.x+this.width/4 ,this.y - 2 +this.height/4  ,this.width-this.width/2,this.height-this.height/2,enemy)){
                             this.x -=2
                             this.direction="left";
                             this.spriteIndex=2;
                         }

                     }
                     if (!structuresCollision(this.x+this.width/4 ,this.y - 2 +this.height/4  ,this.width-this.width/2,this.height-this.height/2,enemy)){
                         this.y-=2
                         this.direction="up";
                         this.spriteIndex=4;
                     }
                 }
             }

         }
    }

    attack(){
        if(player.direction==="down"){
            enemyAttack.spriteIndex=4;
        }else if(player.direction==="left"){
            enemyAttack.spriteIndex=3;
        }else if(player.direction==="right"){
            enemyAttack.spriteIndex=2;
        }else if(player.direction==="right"){
            enemyAttack.spriteIndex=1;
        }

        if (!this.attackTimeout){
            this.attackTimeout=true
            setTimeout(()=>{
                this.attacks.push(new Attack(this.x-30,this.y,this.width+30,this.height+20))
                attackToPlayer(this.attacks[this.attacks.length-1].x,this.attacks[this.attacks.length-1].y,this.attacks[this.attacks.length-1].width,this.attacks[this.attacks.length-1].height)
            },1000)

            this.timeout()
        }

    }
    timeout(){

        setTimeout(() => {
            this.attackTimeout = false;

        }, 1500)
    }
}

/*
Classe inimigo, e respetivos métodos, incluem-se métodos de path finding para preseguir e atacar o jogador
 */

class EnemyStance extends AnimatedSprite{
    constructor(x,y,width,height) {
        super(x,y,width,height);

        this.spriteIndex=1;
    }
    draw() {
        ctx.drawImage(this.images[this.spriteIndex-1], this.sx, this.sy, this.slice.width, this.slice.height,
            enemy.x, enemy.y, enemy.width, enemy.height);
    }
}
/*
Classe para os comportamentos de ataque do inimigo
 */
