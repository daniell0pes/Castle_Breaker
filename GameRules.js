const tiles = {
    width:canvas.width/30,
    height:canvas.height/20

}
let levelNow = []

function idle_setter(){
    switch(player.direction){
        case "down":
            player.state = 1;
        break;

        case "left":
            player.state = 2;
        break;

        case "right":
            player.state = 3;
        break;

        case "up":
            player.state = 4;
        break;
    }
}

function attackDirection(attack) {
    if (player.direction=="right"){
        attack.x += player.width
    }

    if (player.direction=="up"){
        let aux= attack.height
        attack.height=attack.width
        attack.width=aux
        attack.x+=37
    }
    if (player.direction=="down"){
        let aux= attack.height
        attack.height=attack.width
        attack.width=aux
        attack.y+=115
        attack.x+=37

    }
}

function playerStateSetter(attackMode){
    if(attackMode){
        playerattack.draw(player.state);
        playerattack.update();
    }else{
        player.move(keys)
    }
}


function generateCharacters() {

    if (player.level == 1) {
        npc.draw(player.level);
        npc.update();

    }
}


function generateMap() {
    generateCollision()
    //generateCharacters()
}
function generateCollision() {
    levelNow=[]
    console.log(map.colisionsArray.length)
    for(let i = 0; i<map.colisionsArray.length;i+=30){
        levelNow.push(map.colisionsArray.slice(i,i+30));
    }
}

//Função que testa as colisões entre o jogador ou qualquer outro objeto que se mande o X,Y,WIDTH e Height com a posição do tile
//que se quer, esta função tem o propósito de eliminar repetição de código.
function collision(X,Y,Width,Height,SecondX,SecondY,SecondWidth,SecondHeight){

    if(X < SecondX + SecondWidth-20 &&
        X + Width > SecondX &&
        Y < SecondY + SecondHeight-12 &&
        Y + Height > SecondY){

        return true;
    }
}

function TileToPlayerCollsion(X,Y,Width,Height,tileX,tileY){
    if(X < tileX + tiles.width-20 &&
        X + Width > tileX &&
        Y < tileY + tiles.height-12 &&
        Y + Height > tileY){

            return true;
    }
}
function roomPassAndInteract(level,X,Y,Width,Height,tileX,tileY){
    if(level === 1 ||  level === 2 || level === 3 || level === 4 || level === 5 || level === 6 || level === 7) {
        if(TileToPlayerCollsion(X,Y,Width,Height,tileX,tileY)){
            if (player.level===1){

                if(level === 2) {
                    player.x=canvas.width-player.width-tiles.width*3;
                    player.y = canvas.height-player.height-tiles.height*2

                    enemy = new Enemy(tiles.width*7,tiles.height*6,64,64,100,10)
                    enemy.load("Assets/Donut.png")
                }
                if(level === 3) {
                    player.x=canvas.width-player.width-tiles.width*13;
                    player.y = canvas.height-player.height
                }
            }
            if (player.level===2){

                if(level === 1) {
                    player.x=canvas.width - tiles.width*5;
                    player.y =(tiles.height*9)-player.height;
                }
                if(level === 4) {
                    player.x=canvas.width-player.width-tiles.width*13;
                    player.y = canvas.height-player.height-tiles.height
                }
                if(level === 5) {
                    player.x=canvas.width-player.width-tiles.width*13;
                    player.y = canvas.height-player.height-tiles.height
                }
            }
            if (player.level===3){

                if(level === 1) {
                    player.x=tiles.width*4;
                    player.y =(tiles.height*8)-player.height;
                }
                if(level === 6) {
                    player.x=canvas.width-player.width-tiles.width*13;
                    player.y = canvas.height-player.height-tiles.height*2
                }
            }

            if (player.level===4){

                if(level === 2) {
                    player.x=tiles.width*9;
                    player.y =tiles.height*1.5;
                }
                if(level === 7) {

                }
            }
            if (player.level===5){

                if(level === 2) {
                    player.x=tiles.width*22;
                    player.y =tiles.height*1.5;
                }
                if(level === 7) {

                }
            }
            if (player.level===6){

                if(level === 3) {
                    player.x=canvas.width-player.width-tiles.width*13;
                    player.y =tiles.height*5;
                }
                if(level === 4) {
                    player.x=tiles.width*0.80;
                    player.y = tiles.height*5.5
                }
            }
            player.level= level;
            map.init(player.level)
            generateMap()




            }


        }
    if(level == 503 || level == 505|| level == 506) {

        if(TileToPlayerCollsion(X,Y,Width+50,Height+50,tileX,tileY)){


            eButton.interactAction=true

        }
        else {
            eButton.interactAction=false
        }
    }


}
function structuresCollision(X,Y,Width,Height,type){
    let tileX=0
    let tileY=0

    for (let i =0;i<levelNow.length;i++){
        for (let f=0;f<levelNow[0].length;f++){



            if (tileX>=canvas.width-1){

                tileY+=tiles.height
                tileX=0
            }

            if (type instanceof Player){


                if (collision(player.x,player.y,player.width,player.height,npc.x+npc.width/2,npc.y+npc.height/2,npc.width-npc.width/1.3,npc.height-npc.height/2)){

                    eButton.interactAction=true


                }
                else{
                    eButton.interactAction=false

                }
                roomPassAndInteract(levelNow[i][f],X,Y,Width,Height,tileX,tileY)
            }



                if(levelNow[i][f] == 10) {

                    if(TileToPlayerCollsion(X,Y,Width,Height,tileX,tileY)){
                        return true;
                    }

                }



            tileX+=tiles.width

        }

    }

}
function Hp(){

    ctx.fillStyle="red";
    ctx.fillRect(0,0,400,20)
    ctx.fillStyle="green";
    ctx.fillRect(0,0,player.life*4,20)
    ctx.strokeStyle= "Gold"; //set the color of the stroke line
    ctx.strokeRect(0,0,400,20)

}


function attackToEnemy(){
if (playerattack.attacks!=[] && enemy!=null){
   if (collision(playerattack.attacks[playerattack.attacks.length-1].x,playerattack.attacks[playerattack.attacks.length-1].y,playerattack.attacks[playerattack.attacks.length-1].width,playerattack.attacks[playerattack.attacks.length-1].height,enemy.x,enemy.y,enemy.width,enemy.height)){
playerattack.attacks.splice(playerattack.attacks.length-1,1)
        enemy.life-= player.damage
       if (player.direction==="right"){
       enemy.x+=10}
       if (player.direction==="left"){
       enemy.x-=10}
       if (player.direction==="up"){
       enemy.y-=10}
       if (player.direction==="down"){
       enemy.y+=10}




}}
}
function attackToPlayer(x,y,width,height){
if (enemy.attacks!=[]){
   if (collision(x,y,width,height,player.x,player.y,player.width,player.height)) {
       enemy.attacks.splice(enemy.attacks.length - 1, 1)
       player.life -= enemy.damage
   }}
}



//para propósito de testes
function DrawstructuresCollision(){

    let x=0
    let y=0

    for (let i =0;i<levelNow.length;i++){
        for (let f=0;f<levelNow[0].length;f++){
            if (x>=canvas.width-1){

                y+=tiles.height
                x=0
            }

            if(levelNow[i][f] === 2) {
                ctx.fillStyle="blue"
                ctx.fillRect(x,y,tiles.width,tiles.height)
            }
            if(levelNow[i][f] === 3) {
                ctx.fillStyle="yellow"
                ctx.fillRect(x,y,tiles.width,tiles.height)
            }

                if(levelNow[i][f] == 10) {

                    ctx.fillStyle='red';
                    ctx.fillRect(x,y,tiles.width,tiles.height);


                }
 if(levelNow[i][f] == 503) {

                    ctx.fillStyle='pink';
                    ctx.fillRect(x,y,tiles.width,tiles.height);


                }
            if(levelNow[i][f] == 6) {

                ctx.fillStyle='black';
                ctx.fillRect(x,y,tiles.width,tiles.height);


            }


            x+=tiles.width

        }

    }

}
function quadrantePlayerAoInimigo(){

    if (enemy.x > player.x && enemy.y>player.y){
        alert("Player no canto superior esquerdo do inimigo")
    }
    if (enemy.x < player.x && enemy.y>player.y){
        alert("Player no canto superior direito do inimigo")
    }
    if (enemy.x < player.x && enemy.y<player.y){
        alert("Player no canto inferior direito do inimigo")
    }
    if (enemy.x > player.x && enemy.y<player.y){
        alert("Player no canto inferior esquerdo do inimigo")
    }

}












