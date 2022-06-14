const map = new Level(0,0,canvas.width,canvas.height);
const foreground = new Level(0,0,canvas.width,canvas.height);
const player = new Player(220,canvas.height/1.5,150,150);
const playerattack = new playerStance(player.x,player.y,player.width,player.height);
let npc = new Npc((canvas.width/2)-50,(canvas.height/2)-40,200,200);
const inventory = new Inventory((canvas.width*1000)/1536, (canvas.height*50)/731,(canvas.width*350)/1536,(canvas.height*600)/731);
let enemy = new Enemy((canvas.width/2) -tiles.width*3,(canvas.height/2)-tiles.height*5,player.width,player.height,100,100,100,false);
const item = new Item((canvas.width*1028)/1536,(canvas.height*85)/731,(canvas.width*295)/1536,(canvas.height*80)/731);
const selection = new Selection(item.x,item.y,item.width,item.height);
const check = new Check();
const eButton = new Interact(player.x,player.y,30,30);
const dialogBox = new Dialog((canvas.width*168)/1536,(canvas.height*411)/731,(canvas.width*1200)/1536,(canvas.height*300)/731);
const enemyAttack = new EnemyStance(enemy.x,enemy.y,enemy.width,enemy.height);
let animationId

var audio = new Audio('Assets/Audio/CastleBreakerTheme.wav');
var finalBattle = new Audio('Assets/Audio/Battle-Furious.mp3')
var battles = new Audio('Assets/Audio/8bit-Battle01.mp3')
var death = new Audio('Assets/Audio/GameOverMan.wav')

finalBattle.volume=0.5
battles.volume=0.5
dialogBox.load("Assets/Dialog/dialogbox.png");
eButton.load("Assets/Interact/Interagir.png")
map.load("Assets/room1.png","Assets/room2.png","Assets/room3.png","Assets/room4.png","Assets/room5.png","Assets/room6.png","Assets/room7.png");
foreground.load("Assets/room1foreground.png","Assets/room2foreground.png","Assets/room3foreground.png","Assets/room4foreground.png","Assets/room5foreground.png","Assets/room6foreground.png","Assets/room7foreground.png")

enemyAttack.load(15,5,enemyAttack.images,"Assets/Enemy/attack/attack_down.png","Assets/Enemy/attack/attack_left.png",
    "Assets/Enemy/attack/attack_right.png","Assets/Enemy/attack/attack_up.png");

player.load(30,6,player.images,"Assets/Homer/idle/idle_down.png", "Assets/Homer/idle/idle_left.png",
    "Assets/Homer/idle/idle_right.png", "Assets/Homer/idle/idle_up.png", 'Assets/Homer/walk/walk_down.png', 'Assets/Homer/walk/walk_left.png', 'Assets/Homer/walk/walk_right.png',
    'Assets/Homer/walk/walk_up.png');

playerattack.load(15,5,playerattack.images,"Assets/Homer/attack/atack_down.png","Assets/Homer/attack/atack_left.png",
    "Assets/Homer/attack/atack_right.png","Assets/Homer/attack/atack_up.png");

npc.load(18,6,npc.images,"Assets/NPC/Golem/idle_down.png");

enemy.load(30,6,enemy.images,"Assets/Enemy/walk/walk_down.png","Assets/Enemy/walk/walk_left.png", "Assets/Enemy/walk/walk_right.png","Assets/Enemy/walk/walk_up.png");

inventory.load("Assets/Inventory/inventory.png","Assets/Inventory/sword1.png","Assets/Inventory/shield1.png",
    "Assets/Inventory/potion1.png","Assets/Inventory/potion2.png","Assets/Inventory/elixir.png","Assets/Inventory/sword2.png","Assets/Inventory/shield2.png");

player.inventory.push(new Sword(item.x,item.y,item.width,item.height,1,10),new Shield(item.x,item.y*2,item.width,item.height,2,10));

check.load("Assets/Inventory/check.png");

//enemy=null

map.init(player.level)
generateMap()

const fps=30;

function animate(){


    setTimeout(function () {
    animationId = requestAnimationFrame(animate);
    DrawstructuresCollision();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    map.draw(player.level);

    generateCharacters();
   // ctx.fillRect(player.x+player.width/4,player.y +player.height/4,player.width-player.width/2,player.height-player.height/2)
    //ctx.fillRect(enemy.x-enemy.radius/1.5,enemy.y-enemy.radius/1.5,enemy.radius*3,enemy.radius*3)
        //ctx.fillRect(player.x,player.y,player.width,player.height)
        //ctx.fillRect(npc.x,npc.y,npc.width,npc.height)
    playerStateSetter(attackTimeOut);




if (enemy!=null){
        if (enemy.life<=0){

    enemy=null
}
    enemyStateSetter(enemy.attackTimeout);}
//structuresCollision(player.x,player.y,player.width,player.height)
    foreground.draw(player.level)
    inventory.drawInventory();
    Hp();
        eButton.update()
playerDeath()

        if (enemy!=null){
            enemiesHpDraw(enemy.life,enemy.maxLife,enemy.x+enemy.width/6,enemy.y)
        }
        //console.log("Espaços á direita -   "+rightPathPossible(enemy.positionArray.x,enemy.positionArray.y-3))
        //console.log("Espaços á esquerda -   "+leftPathPossible(enemy.positionArray.x,enemy.positionArray.y-3))

        //---------------------------//
        //dialogBox.dialog=story_dialog[0];
        //dialogBox.draw();
        //---------------------------//

   /* playerattack.attacks.forEach(attack =>{ //desenho das colisões de ataque
        attack.drawCollision()
    })*/
playSong()
    }, 1000/fps);
}

animate();