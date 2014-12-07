module FlyingBlind {
    export class Guidable extends Phaser.Sprite implements Clickable{

        navNodes: Phaser.Point[];
        hitboxRadius = 20;

        speed = 1;
        drawing: boolean = false;
        velocity = new Phaser.Point(0, 0);
        color: number;

        constructor(game: Phaser.Game, x: number, y: number, key, color) {
            super(game, x, y, key);
            this.color = color;
            this.tint = color;
            this.anchor.setTo(0.5, 0.5);
            this.scale.set(0.75, 0.75);

            

            this.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.navNodes = [];

        }

        onMouseClick = (guidable, pointer) => {
            console.log("click!");
            this.drawing = true;
            this.navNodes = [];
        }

        onMouseRelease = () => {
            console.log("release");
            this.drawing = false;
        }

        
        update() {
            
            if (this.drawing) {
                this.navNodes.push(this.game.input.activePointer.position.clone());
            }

            
            while (this.navNodes.length > 0 && this.position.distance(this.navNodes[0]) < 15) {
                this.navNodes.shift();
            }


            if (this.navNodes.length == 0) {
               // this.velocity = new Phaser.Point(0,0);
            }
            else {

                
                var vel: Phaser.Point = this.navNodes[0].clone().subtract(this.position.x, this.position.y);
                

                this.velocity = vel;
            }

            

            if (this.x + this.hitboxRadius > this.game.width) {
                this.navNodes = [];
                this.velocity.x = -Math.abs(this.velocity.y);
            }
            else if (this.x - this.hitboxRadius < 0 ) {
                this.navNodes = [];
                this.velocity.x = Math.abs(this.velocity.x);
            }

            if (this.y + this.hitboxRadius> this.game.height) {
                this.navNodes = [];
                this.velocity.y = -Math.abs(this.velocity.y);
            }
            else if (this.y - this.hitboxRadius< 0) {
                this.navNodes = [];
                this.velocity.y = Math.abs(this.velocity.y);
            }

            this.updateRotation();

            this.velocity.setMagnitude(this.speed);
            this.position = this.position.add(this.velocity.x, this.velocity.y);





        }

        updateRotation() {
            this.rotation = this.game.physics.arcade.moveToXY(this, this.x + this.velocity.x, this.y + this.velocity.y, this.speed, 10);
        }

    }

}