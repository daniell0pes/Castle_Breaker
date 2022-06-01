let keys = [];

let existe=false;
addEventListener("keyup", function(e){
    for (let i =0; i<keys.length;i++){

        if (keys[i] == e.key){
            existe=false;
            keys.splice(i,1);
        }
    }
    if(e.key==="a" || e.key==="d" || e.key==="w" || e.key==="s") {
        idle_setter()
    }
})

window.addEventListener('keydown',function(e){
    for (let i =0; i<keys.length;i++){
        if (keys[i] == e.key){
            existe=true;
        }
        else{
            existe=false
        }
    }
    if (!existe){
        keys.push(e.key);
    }
});
let attackTimeOut = false;
window.addEventListener("click",function (e) {


    if (!attackTimeOut){
       if (e.clientY < player.y && e.clientX >player.x && e.clientX<player.x +player.width ){
           player.direction="up"
           player.state = 8;
           idle_setter()

       }
       else if (e.clientX > player.x +32){
            player.direction="right"
            player.state = 7;

        }
       else if (e.clientX < player.x +32 ){
            player.direction="left"
            player.state = 6;

        }

        if (e.clientY > player.y && e.clientX >player.x && e.clientX<player.x +player.width ){
            player.direction="down"
            player.state = 5;

        }

        console.log("x do rato: " + e.clientX + "y do rato:"+ e.clientY)
        player.attack()
        attackTimeOut=true;

   }
    setTimeout(() => {
      attackTimeOut = false;
    }, 500)
} )
