const tiles = {
    width:canvas.width/30,
    height:canvas.height/20

}

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

function generateCollision(){
    for(let i = 0; i<map.colisionsArray.length;i+=30){
        map.levelNow.push(map.colisionsArray.slice(i,i+30));
    }
}


function structuresCollision(X,Y,Width,Height){
    let x=0
    let y=0

    for (let i =0;i<map.levelNow.length;i++){
        for (let f=0;f<map.levelNow[0].length;f++){

            if (x>=canvas.width){

                y+=tiles.height
                x=0
            }
            if(map.levelNow[i][f] === 20) {
                if(X < x + tiles.width-20 &&
                    X + Width > x &&
                    Y < y + tiles.height-12 &&
                    Y + Height > y){
                    player.level++;
                    generateCollision();
                }
            }

                if(map.levelNow[i][f] == 10) {

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

    for (let i =0;i<map.levelNow.length;i++){
        for (let f=0;f<map.levelNow[0].length;f++){
            if (x>=canvas.width){

                y+=tiles.height
                x=0
            }

            if(map.levelNow[i][f] === 20) {
                ctx.fillRect(x,y,tiles.width,tiles.height)
            }

                if(map.levelNow[i][f] == 10) {

                    ctx.fillStyle='red';
                    ctx.fillRect(x,y,tiles.width,tiles.height);


                }

            x+=tiles.width

        }

    }

}
