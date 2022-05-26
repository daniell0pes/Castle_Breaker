const map = new Level(0,0,canvas.width,canvas.height);
map.load("Assets/room3.png");


function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    map.draw(1);

}

animate();