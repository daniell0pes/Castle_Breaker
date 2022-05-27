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


function structuresCollision(X,Y,Width,Height){
    chooseLevel(player.level);

    let x=0
    let y=0

    for (let i =0;i<=levelNow.length;i++){
        for (let f=0;f<=levelNow[0].length;f++){

            if (x>canvas.width){

                y+=tiles.height
                x=0
            }
            if (i<20&&f<30){
                if(levelNow[i][f] == 10) {


                    if(X < x + tiles.width-20 &&
                        X + Width > x &&
                        Y < y + tiles.height-12 &&
                        Y + Height > y){
                        return true;
                    }




                }}

            x+=tiles.width

        }

    }

}
