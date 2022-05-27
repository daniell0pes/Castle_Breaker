const map = new Level(0,0,canvas.width,canvas.height);
const foreground = new Level(0,0,canvas.width,canvas.height);
const player = new Player(220,450,150,150);

player.load(30,6,"Assets/Homer/idle/idle_down.png", "Assets/Homer/idle/idle_left.png",
    "Assets/Homer/idle/idle_right.png", "Assets/Homer/idle/idle_up.png", 'Assets/Homer/walk/walk_down.png', 'Assets/Homer/walk/walk_left.png', 'Assets/Homer/walk/walk_right.png',
    'Assets/Homer/walk/walk_up.png','Assets/Homer/dead/death.png');


map.load("Assets/room1.png","Assets/room2.png","Assets/room3.png","Assets/room4.png","Assets/room5.png","Assets/room6.png");
foreground.load("Assets/room1foreground.png","Assets/room2foreground.png","Assets/room3foreground.png","Assets/room4foreground.png","Assets/room5foreground.png","Assets/room6foreground.png")

const fps=30;
function animate(){
    setTimeout(function () {
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    map.draw(player.level);
    player.move(keys);
    foreground.draw(player.level)
    }, 1000/fps);
}

animate();