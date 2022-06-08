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
        player.damage += this.stats.damage;
        player.life += this.stats.hp;
    }

    unequip(){
        this.equiped = false;
        player.damage = player.damage-this.stats.damage;
        player.life = player.life-this.stats.hp;
    }
}

class Sword extends Item{
    constructor(x,y,width,height) {
        super(x,y,width,height);
    }
}

class Potion extends Item{
    constructor(x,y,width,height) {
        super(x,y,width,height);
    }
}

class Shield extends Item{
    constructor(x,y,width,height) {
        super(x,y,width,height);
    }
}