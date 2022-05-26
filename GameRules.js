const tiles = {
    width:canvas.width/30,
    height:canvas.height/20

}

function idle_setter(){ //gera problemas
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