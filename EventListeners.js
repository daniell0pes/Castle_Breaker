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


       if (e.clientY<player.y+player.height/2 && e.clientX>player.x-30 && e.clientX<player.x+player.width +30){

           player.direction="up";
           player.state = 4;
       }
       else if (e.clientX>player.x- player.width/2){

           player.direction="right";
           player.state = 3;
       }
       if (e.clientY>player.y+player.height/2 && e.clientX>player.x-30 && e.clientX<player.x+player.width +30){
           player.direction="down";
           player.state = 1;

       }
       else if (e.clientX<player.x+ player.width/2){
          player.direction="left";
           player.state = 2;
       }
       playerattack.attack()
       attackTimeOut=true;

   }
    setTimeout(() => {
      attackTimeOut = false;
    }, 500)
} )
