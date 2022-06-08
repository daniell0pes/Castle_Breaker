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
    }

    unequip(){
        this.equiped = false;

    }
}

class Sword extends Item{
    constructor(x,y,width,height,damage) {
        super(x,y,width,height);
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

class Potion extends Item{
    constructor(x,y,width,height,hp) {
        super(x,y,width,height);
    }

    equip(){
        super.equip();
        player.life += this.hp;
    }

}

class Shield extends Potion{
    constructor(x,y,width,height,hp) {
        super(x,y,width,height,hp);
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
        }else if(key==="Enter" && this.numberOfOptions>0 && this.numberOfOptions<(player.inventory.length-1)){
            if(!player.inventory[this.numberOfOptions].equiped){
                player.inventory[this.numberOfOptions].equip();
            }else if(player.inventory[this.numberOfOptions].equiped && player.inventory[this.numberOfOptions] instanceof Sword || player.inventory[this.numberOfOptions] instanceof Shield){
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