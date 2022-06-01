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
function generateCollision() {
    levelNow=[]
    console.log(map.colisionsArray.length)
    for(let i = 0; i<map.colisionsArray.length;i+=30){
        levelNow.push(map.colisionsArray.slice(i,i+30));
    }
}



function structuresCollision(X,Y,Width,Height){
    let x=0
    let y=0

    for (let i =0;i<levelNow.length;i++){
        for (let f=0;f<levelNow[0].length;f++){

            if (x>=canvas.width-1){

                y+=tiles.height
                x=0
            }
            if(levelNow[i][f] === 20) {
                if(X < x + tiles.width-20 &&
                    X + Width > x &&
                    Y < y + tiles.height-12 &&
                    Y + Height > y){
                    console.log("aqui")
                    player.level++;
                    map.init(player.level)
                    generateCollision()

                }
            }

                if(levelNow[i][f] == 10) {

                    if(X < x + tiles.width-20 &&
                        X + Width > x &&
                        Y < y + tiles.height-12 &&
                        Y + Height > y){
                        return true;
                    }

                }

            x+=tiles.width

        }

    }

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

            if(levelNow[i][f] === 20) {
                ctx.fillStyle="blue"
                ctx.fillRect(x,y,tiles.width,tiles.height)
            }

                if(levelNow[i][f] == 10) {

                    ctx.fillStyle='red';
                    ctx.fillRect(x,y,tiles.width,tiles.height);


                }

            x+=tiles.width

        }

    }

}
