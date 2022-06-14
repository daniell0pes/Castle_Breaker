class Item extends Sprite {
    constructor(x,y,width,height,id) {
        super(x,y,width,height);
        this.equiped = false;
        this.id=id;
    }
    draw(){
        ctx.drawImage(inventory.images[this.id], this.x, this.y, this.width, this.height)
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
    constructor(x,y,width,height,id,damage) {
        super(x,y,width,height,id);
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

class Elixir extends Item{
    constructor(x,y,width,height,id,damage) {
        super(x,y,width,height,id);

        this.damage = damage;
    }
}

class Potion extends Item{
    constructor(x,y,width,height,id,hp) {
        super(x,y,width,height,id);
        this.hp = hp;
    }

    equip(){
        super.equip();
        player.life += this.hp;
        player.maxLife+=this.hp
    }

}

class Shield extends Potion{
    constructor(x,y,width,height,id,hp) {
        super(x,y,width,height,id,hp);
        this.hp = hp;
    }

    unequip() {
        super.unequip();
        player.life = player.life - this.hp;
        player.maxLife-=this.hp
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
                player.inventory.forEach((item,index)=>{
                    if(item.constructor.name === player.inventory[this.numberOfOptions].constructor.name && item!==player.inventory[this.numberOfOptions]){
                        item.unequip();
                        for(let i=0; i<this.checks.length;i++) {
                            if (this.checks[i].y === item.y + (canvas.height * 40) / 731) {
                                this.checks.splice(i, 1);
                            }
                        }
                    }
                })
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