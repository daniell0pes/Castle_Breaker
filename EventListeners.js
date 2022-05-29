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

window.addEventListener("click",function (e) {
    console.log("shoot")
} )
