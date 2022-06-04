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
    //Npcs.splice(0,1)
    if (player.level == 1) {
        /*
        let img = new Image(150,150)
        img.src="Assets/Donut.png"
        Npcs.push(new Npc((canvas.width/2)-30,canvas.height/2,150,150))
        Npcs[0].images.push(img);
        */
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
function TileToPlayerCollsion(X,Y,Width,Height,tileX,tileY){
    if(X < tileX + tiles.width-20 &&
        X + Width > tileX &&
        Y < tileY + tiles.height-12 &&
        Y + Height > tileY){

            return true;
    }
}
function structuresCollision(X,Y,Width,Height){
    let tileX=0
    let tileY=0

    for (let i =0;i<levelNow.length;i++){
        for (let f=0;f<levelNow[0].length;f++){

            if (tileX>=canvas.width-1){

                tileY+=tiles.height
                tileX=0
            }
            if(levelNow[i][f] === 1 ||  levelNow[i][f] === 2 || levelNow[i][f] === 3 || levelNow[i][f] === 4 || levelNow[i][f] === 5 || levelNow[i][f] === 6 || levelNow[i][f] === 7) {
                if(TileToPlayerCollsion(X,Y,Width,Height,tileX,tileY)){
                    if (player.level===1){

                       if(levelNow[i][f] === 2) {
                        player.x=canvas.width-player.width-tiles.width*3;
                        player.y = canvas.height-player.height-tiles.height*2
                       }
                        if(levelNow[i][f] === 3) {
                            player.x=canvas.width-player.width-tiles.width*13;
                            player.y = canvas.height-player.height
                        }
                    }
                    if (player.level===2){

                        if(levelNow[i][f] === 1) {
                            player.x=canvas.width - tiles.width*5;
                            player.y =(tiles.height*9)-player.height;
                        }
                        if(levelNow[i][f] === 4) {
                            player.x=canvas.width-player.width-tiles.width*13;
                            player.y = canvas.height-player.height-tiles.height
                        }
                        if(levelNow[i][f] === 5) {
                            player.x=canvas.width-player.width-tiles.width*13;
                            player.y = canvas.height-player.height-tiles.height
                        }
                    }
                    if (player.level===3){

                        if(levelNow[i][f] === 1) {
                            player.x=tiles.width*4;
                            player.y =(tiles.height*8)-player.height;
                        }
                        if(levelNow[i][f] === 6) {
                            player.x=canvas.width-player.width-tiles.width*13;
                            player.y = canvas.height-player.height-tiles.height*2
                        }
                    }

                    if (player.level===4){

                        if(levelNow[i][f] === 2) {
                            player.x=tiles.width*9;
                            player.y =tiles.height*1.5;
                        }
                        if(levelNow[i][f] === 7) {

                        }
                    }
                    if (player.level===5){

                        if(levelNow[i][f] === 2) {
                            player.x=tiles.width*22;
                            player.y =tiles.height*1.5;
                        }
                        if(levelNow[i][f] === 7) {

                        }
                    }
                    if (player.level===6){

                        if(levelNow[i][f] === 3) {
                            player.x=canvas.width-player.width-tiles.width*13;
                            player.y =tiles.height*5;
                        }
                        if(levelNow[i][f] === 4) {
                            player.x=tiles.width*0.80;
                            player.y = tiles.height*5.5
                        }
                    }
                    player.level= levelNow[i][f];
                    map.init(player.level)
                    generateMap()


                }
            }



                if(levelNow[i][f] == 199) {

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
 if(levelNow[i][f] == 1) {

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
