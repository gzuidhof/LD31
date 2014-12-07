module FlyingBlind {
    export class GameLevel extends Phaser.State {

        background: Phaser.Sprite;
        windowSprite: Phaser.Sprite;

        renderer: MemoryRenderer;

        gameObjects: Phaser.Sprite[] = [];
        guidables: Guidable[] = [];
        runways: Runway[] = [];

        maskRect: Phaser.Rectangle;

        addToGame(e: Phaser.Sprite) {
            this.gameObjects.push(e);
            this.gameObjects.sort((a, b) => a.z - b.z);
        }

        addGuidable(x, y, color: number, heli) {
            var sprite = new Guidable(this.game, x, y, heli? 'heli': 'ship2', color, heli);
            this.addToGame(sprite);
            this.guidables.push(sprite);
            return sprite;
        }

        addRunway(x, y, dx, dy, type, color, heli) {
            var sprite = new Runway(this.game, x, y, dx, dy, color, heli);
            this.addToGame(sprite);
            this.runways.push(sprite);
        }

        checkForLandings() {
            this.guidables.forEach((plane) => {

                this.runways.forEach((runway) => {
                    if (runway.checkLanded(plane)) {
                        plane.startLanding(runway.direction, this.onLandingFinished);
                        //console.log("LANDED!");
                    }

                });

            });

        }

        checkForCollisions() {
            for (var i = 0; i < this.guidables.length; i++) {
                for (var j = i+1; j < this.guidables.length; j++) {
                    //if (j !== i) {
                        var planeA = this.guidables[i];
                        var planeB = this.guidables[j];
                        if (!planeA.landing && !planeB.landing) {
                            if (planeA.position.distance(planeB.position) < 34.5) {
                                this.onCollision(planeA, planeB);
                            }
                        }


                    //}

                }

            }


        }

        onCollision(planeA, planeB) {
            console.log('Collision!');
        }

        onLandingFinished = (guidable: Guidable) => {

            //Todo points!

            this.removeFromList(guidable, this.guidables);
            this.removeFromList(guidable, this.gameObjects);
        }


        removeFromList<T>(el: T, l: T[]) {
            var index = l.indexOf(el);
            if (index > -1) {
                l.splice(index, 1);
            }
        }



        create() {
            var game = this.game;
            game.physics.startSystem(Phaser.Physics.ARCADE);
            this.maskRect = new Phaser.Rectangle(0, 0, 436, 300);
            this.renderer = new MemoryRenderer(game, this.maskRect);
            

            this.renderer.drawAllNoMask(this.gameObjects);

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

        maxSpeed = 10;
        velocity: Phaser.Point = new Phaser.Point(0,0);
        snapiness: number = 0.008;
        

        update() {
            var mousePos = new Phaser.Point(this.game.input.x, this.game.input.y)
            //console.log('x ' + mousePos.x);
            //console.log('y ' + mousePos.y);

            var curPos = new Phaser.Point(this.maskRect.centerX, this.maskRect.centerY);

            var desiredVel = mousePos.subtract(curPos.x, curPos.y).multiply(0.2, 0.2);
            
            if (desiredVel.getMagnitude() > this.maxSpeed) {
                desiredVel.normalize().setMagnitude(this.maxSpeed);
            }


            this.velocity = this.interpPoints(this.velocity, desiredVel, this.game.time.elapsed * this.snapiness);
            this.maskRect.centerOn (curPos.x + this.velocity.x, (curPos.y + this.velocity.y)) ;
            this.windowSprite.position.set(this.maskRect.centerX, this.maskRect.centerY);

            this.checkForLandings();
            this.checkForCollisions();

            for (var i = 0; i < this.gameObjects.length; i++) {
                this.gameObjects[i].update();
            }

            this.renderer.update(this.gameObjects);


           
            

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
