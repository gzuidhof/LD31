module Blindfire {
    export class Level extends Phaser.State {

        background: Phaser.Sprite;
        windowSprite: Phaser.Sprite;
        logo: Phaser.Sprite;

        renderer: MemoryRenderer;

        gameObjects: Phaser.Sprite[] = [];

        maskRect: Phaser.Rectangle;

        addToGame(e: Phaser.Sprite) {
            this.gameObjects.push(e);
            this.gameObjects.sort((a, b) => a.z - b.z);
        }


        create() {
            this.gameObjects = [];
            var game = this.game;
            game.physics.startSystem(Phaser.Physics.ARCADE);

            this.logo = this.game.add.sprite(10, 10, 'logo');
            this.background = this.game.make.sprite(0, 0, 'cat_eyes');
           

            this.maskRect = new Phaser.Rectangle(0, 0, 326, 220);

            this.renderer = new MemoryRenderer(game, this.maskRect);
            this.addToGame(this.background);

            this.renderer.drawAllNoMask(this.gameObjects);


           // this.renderer.add(this.background);
            var color = GoldenColorGenerator.generateColor();
            this.addToGame(new Guidable(this.game, 50, 50, 'ship2', this.RGBtoHEX(color[0], color[1], color[2])));

            //this.game.input.ad
            this.game.input.onDown.add(this.handleMouseDown);
            this.game.input.onUp.add(this.handleMouseUp);

            this.windowSprite = this.game.add.sprite(0, 0, 'window');
            this.windowSprite.anchor.set(0.5, 0.5);
        }

        handleMouseDown = () => {
            this.gameObjects.forEach((val: any) => {
                if (val.hitboxRadius && val.onMouseClick) {
                    
                    if (this.game.input.mousePointer.position.distance(val.position) < val.hitboxRadius) {
                        val.onMouseClick();
                    }
                }
            });
        }

        handleMouseUp = () => {
            this.gameObjects.forEach((val: any) => {
                if (val.onMouseRelease) {
                    val.onMouseRelease();
                }
            });
        }

        



        i = 0;
        maxSpeed = 10;
        velocity: Phaser.Point = new Phaser.Point(0,0);
        snapiness: number = 0.008;
        

        update() {
            var mousePos = new Phaser.Point(this.game.input.x, this.game.input.y);
            var curPos = new Phaser.Point(this.maskRect.centerX, this.maskRect.centerY);

            var desiredVel = mousePos.subtract(curPos.x, curPos.y).multiply(0.2, 0.2);
            
            if (desiredVel.getMagnitude() > this.maxSpeed) {
                desiredVel.normalize().setMagnitude(this.maxSpeed);
            }


            this.velocity = this.interpPoints(this.velocity, desiredVel, this.game.time.elapsed * this.snapiness);
            this.maskRect.centerOn (curPos.x + this.velocity.x, (curPos.y + this.velocity.y)) ;
            this.windowSprite.position.set(this.maskRect.centerX, this.maskRect.centerY);


            this.renderer.update(this.gameObjects);

            for (var i = 0; i < this.gameObjects.length; i++) {
                this.gameObjects[i].update();
            }

        }

        render() {

            

            
            this.renderer.render();
        }

        RGBtoHEX(r, g, b) {

            return r << 16 | g << 8 | b;

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
