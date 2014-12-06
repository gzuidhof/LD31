module Blindfire {
    export class Level extends Phaser.State {

        background: Phaser.Sprite;
        logo: Phaser.Sprite;

        renderer: MemoryRenderer;


        maskRect: Phaser.Rectangle;


        create() {

            var game = this.game;
            game.physics.startSystem(Phaser.Physics.ARCADE);

            this.logo = this.game.add.sprite(10, 10, 'logo');
            this.background = this.game.make.sprite(0, 0, 'cat_eyes');
            var block = this.game.make.sprite(0, 0, 'block');
            var block2 = this.game.make.sprite(50, 30, 'block');

            this.maskRect = new Phaser.Rectangle(0, 0, 100, 100);

            this.renderer = new MemoryRenderer(game, this.maskRect);
            this.renderer.add(this.background);
            this.renderer.add(block);
            this.renderer.add(block2);
            
           // this.renderer.add(this.background);
            
        }

        i = 0;
        maxSpeed = 10;
        velocity: Phaser.Point = new Phaser.Point(0,0);
        snapiness: number = 0.01;
        

        update() {
            var mousePos = new Phaser.Point(this.game.input.x, this.game.input.y);
            var curPos = new Phaser.Point(this.maskRect.centerX, this.maskRect.centerY);

            var desiredVel = mousePos.subtract(curPos.x, curPos.y);
            
            if (desiredVel.getMagnitude() > this.maxSpeed) {
                desiredVel.normalize().setMagnitude(this.maxSpeed);
            }


            this.velocity = this.interpPoints(this.velocity, desiredVel, this.game.time.elapsed * this.snapiness);

           // console.log(curPos);
           // console.log(mousePos);
            //console.log(desiredVel);
            //console.log(desiredVel.getMagnitude());
            this.maskRect.centerOn (curPos.x + this.velocity.x, (curPos.y + this.velocity.y)) ;
//            this.maskRect.centerX = (curPos.y + this.velocity.y);

            this.renderer.update();
        }

        render() {
            this.renderer.render();
        }

        interpPoints(a: Phaser.Point, b: Phaser.Point, t) {
            return a.setTo(this.interp(a.x, b.x, t), this.interp(a.y, b.y, t));
        }

        interp(a: number, b: number, t: number): number {
            t = Math.max(0, Math.min(t, 1));
            return a + t * (b - a);
        }



    }




}
