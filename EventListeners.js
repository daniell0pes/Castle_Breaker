let keys = [];

let existe=false;
addEventListener("keyup", event=>{
    for (let i =0; i<keys.length;i++){

        if (keys[i] == event.key){
            existe=false;
            keys.splice(i,1);
        }
    }
    //idle_setter()
})

window.addEventListener('keydown',event=>{

    for (let i =0; i<keys.length;i++){
        if (keys[i] == event.key){
            existe=true;
        }
        else{
            existe=false
        }
    }
    if (!existe){
        keys.push(event.key);
    }
});
