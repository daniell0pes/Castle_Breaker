class Item extends Sprite {
    constructor(x,y,width,height) {
        super(x,y,width,height);
        this.equiped = false;
        this.stats = {
            damage : 0,
            hp:0
        }
    }
    draw(index){
        ctx.drawImage(inventory.images[index], this.x, this.y, this.width, this.height)
    }

    equip(){
        this.equiped = true;
        console.log("Player Hp: " + player.life + "Player Damage: " + player.damage);
    }

    unequip(){
        this.equiped = false;
        console.log("Player Hp: " + player.life + "Player Damage: " + player.damage);
    }
}

class Sword extends Item{
    constructor(x,y,width,height,damage) {
        super(x,y,width,height);

        this.damage = damage;
    }
    equip(){
        super.equip()
        player.damage += this.damage;
    }

    unequip() {
        super.unequip();
        player.damage= player.damage-this.damage;
    }
}

class Elixir extends Sword{
    constructor(x,y,width,height,damage) {
        super(x,y,width,height);

        this.damage = damage;
    }
}

class Potion extends Item{
    constructor(x,y,width,height,hp) {
        super(x,y,width,height);

        this.hp = hp;
    }

    equip(){
        super.equip();
        player.life += this.hp;
    }

}

class Shield extends Potion{
    constructor(x,y,width,height,hp) {
        super(x,y,width,height,hp);

        this.hp = hp;
    }

    unequip() {
        super.unequip();
        player.life = player.life - this.hp;
    }
}

class Selection extends Sprite{
    constructor(x,y,width,height) {
        super(x,y,width,height);
        this.numberOfOptions=0;
        this.checks=[];
    }
    draw(){
        ctx.fillStyle="black";
        ctx.strokeRect(this.x,this.y,this.width,this.height);
    }

    select(key){
        console.log(this.numberOfOptions);
        if(key==="ArrowUp" && this.numberOfOptions>0){
            this.numberOfOptions--;
            this.y -= item.y;
        }else if(key==="ArrowDown" && this.numberOfOptions<=(player.inventory.length-2)){
            this.numberOfOptions++;
            this.y+=item.y;
        }else if(key==="Enter" && this.numberOfOptions>=0){
            console.log("equip")
            if(!player.inventory[this.numberOfOptions].equiped){
                player.inventory[this.numberOfOptions].equip();
                this.checks.push(new Check(item.x+(canvas.width*270)/1536,player.inventory[this.numberOfOptions].y+(canvas.height*40)/731,(canvas.width*30)/1536,(canvas.height*30)/731))
            }else if(player.inventory[this.numberOfOptions].equiped && player.inventory[this.numberOfOptions] instanceof Sword || player.inventory[this.numberOfOptions] instanceof Shield){
                console.log("unequip");
                this.checks.forEach((check,index)=>{
                    if(check.y===player.inventory[this.numberOfOptions].y+(canvas.height*40)/731){
                        this.checks.splice(index,1);
                    }
                })
                player.inventory[this.numberOfOptions].unequip();
            }
        }
    }
}

class Check extends Sprite{
    constructor(x,y,width,height) {
        super(x,y,width,height);
    }
    draw(){
        ctx.drawImage(check.images[0], this.x, this.y, this.width, this.height);
    }
}