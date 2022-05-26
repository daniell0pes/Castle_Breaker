const map = new Level(0,0,canvas.width,canvas.height);
map.load("Assets/room3.png","Assets/room5.png","Assets/room6.png");


function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    map.draw(3);

}

animate();