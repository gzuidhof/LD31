

module FlyingBlind {

    var muteMethod;


    export class GameLevel extends Phaser.State {


        mute = () => {
            this.music.volume > 0 ? this.music.volume = 0 : this.music.volume = 0.5;
        }


        background: Phaser.Sprite;
        windowSprite: Phaser.Sprite;

        renderer: MemoryRenderer;

        gameObjects: Phaser.Sprite[] = [];
        guidables: Guidable[] = [];
        runways: Runway[] = [];

        maskRect: Phaser.Rectangle;

        explosionSound: Phaser.Sound;

        scoreSound: Phaser.Sound;
        landSound: Phaser.Sound;
        incomingSound: Phaser.Sound;

        score: number = 0;
        crashes: number = 0;
        maxCrashes: number = 10;

        scoreText: Phaser.Text;
        crashText: Phaser.Text;

        gameOver: boolean = false;

        music: Phaser.Sound;


        create() {
            muteMethod = this.mute;

            this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.M]);
            var key = this.input.keyboard.addKey(Phaser.Keyboard.M);
            key.onDown.add(() => { this.mute() });

            var game = this.game;
            game.physics.startSystem(Phaser.Physics.ARCADE);
            this.maskRect = new Phaser.Rectangle(0, 0, 436, 300);
            this.renderer = new MemoryRenderer(game, this.maskRect);

            this.explosionSound = game.add.audio('explosion', 0.7);
            this.landSound = game.add.audio('land');
            this.incomingSound = game.add.audio('incoming', 0.4);
            this.scoreSound = game.add.audio('score', 0.6);

            this.music = game.add.audio('music', 0.55, true);
            this.music.play();

            this.renderer.drawAllNoMask(this.gameObjects);
            
            this.game.input.onDown.add(this.handleMouseDown);
            this.game.input.onUp.add(this.handleMouseUp);

            this.windowSprite = this.game.add.sprite(0, 0, 'window');
            this.windowSprite.anchor.set(0.5, 0.5);

            var style = { font: "34px Arial", fill: "#eeeeee", dropShadow: true, dropShadowDistance:10, align: "center" };
            this.scoreText = game.add.text(30, 0, "", style);
            this.crashText = game.add.text(30, 40, "", style);
            
            


        }

        onGameOver() {
            this.maskRect.width = 5000;
            this.maskRect.height = 5000;
            this.maskRect.centerOn(this.input.x, this.input.y);

            var style = { font: "84px Arial", fill: "#eeeeee", dropShadow: true, align: "center" };
            this.game.add.text(340, 300, "Game over!", style);
            var style = { font: "44px Arial", fill: "#dddddd", dropShadow: true, align: "center" };
            this.game.add.text(340, 380, "Score: " + this.score, style);
            this.game.add.text(340, 420, "Refresh to play again", style);

            this.gameOver = true;

        }

        onScore(heli: boolean) {
            if (heli) {
                this.score += 6;
               
            }
            else {
                this.score += 10;
            }

            this.scoreText.setText('Score: ' + this.score);


        }

        onCrash() {
            this.crashes++;
            this.crashText.setText('Crashes: ' + this.crashes);
            if (this.crashes >= this.maxCrashes) {
                this.onGameOver();
            }
        }


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
                    if (runway.checkLanded(plane) && !plane.landing) {
                        plane.startLanding(runway.direction, this.onLandingFinished);
                        //console.log("LANDED!");
                        this.landSound.play();
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


        spawn(x, y, color, direction, heli) {
            var sprite = this.addGuidable(x, y, 0xffffff, heli);
            sprite.velocity = direction;

            x = Phaser.Math.clamp(x, 0, this.game.width);
            y = Phaser.Math.clamp(y, 0, this.game.height)

            var indication = this.game.add.sprite(x, y, 'circle');
            indication.anchor.set(0.5, 0.5);
            indication.scale.set(0.3, 0.3);
            indication.tint = GoldenColorGenerator.generateColor32bitEncoded();
            this.game.add.tween(indication.scale).to({ x: 1.2, y: 1.2 }, 4000, Phaser.Easing.Back.Out, true, 0);
            var t = this.game.add.tween(indication).to({ alpha: 0.05 }, 6000, Phaser.Easing.Circular.Out, true, 3000);
            t.onComplete.add(() => {
                this.game.world.remove(indication);
            });
        }


        onCollision(planeA: Guidable, planeB: Guidable) {
            console.log('Collision!');
            this.explosionSound.play();
            planeA.tint = 0x333333;
            planeB.tint = 0x222222;
            
            planeA.startLanding(planeA.velocity, this.onExplosionFinish);
            planeB.startLanding(planeB.velocity, this.onExplosionFinish);

            var indication = this.game.add.sprite((planeA.position.x + planeB.position.x) / 2, (planeA.position.y + planeB.position.y) / 2, 'explosionicon');
            indication.alpha = 0.75;
            indication.scale.set(0.7,0.7);
            indication.anchor.set(0.5, 0.5);
            this.game.add.tween(indication.scale).to({ x: 0.2, y: 0.2 }, 8000, Phaser.Easing.Sinusoidal.In, true, 1000);
            var t = this.game.add.tween(indication).to({ alpha: 0.05 }, 12000, Phaser.Easing.Circular.Out, true, 4000);
            t.onComplete.add(() => {
                this.game.world.remove(indication);
            });

            this.onCrash();
        }

        onExplosionFinish = (guidable: Guidable) => {
            if (guidable.heli) {
                setInterval(() => {
                    this.removeFromList(guidable, this.guidables);
                    this.removeFromList(guidable, this.gameObjects);
                }, 3800);
            }
            else {
                this.removeFromList(guidable, this.guidables);
                this.removeFromList(guidable, this.gameObjects);
            }
        }

        onLandingFinished = (guidable: Guidable) => {

            this.onScore(guidable.heli);
            this.scoreSound.play();

            this.removeFromList(guidable, this.guidables);
            this.removeFromList(guidable, this.gameObjects);
        }


        removeFromList<T>(el: T, l: T[]) {
            var index = l.indexOf(el);
            if (index > -1) {
                l.splice(index, 1);
            }
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

            if (!this.gameOver) {

                this.checkForLandings();
                this.checkForCollisions();

                for (var i = 0; i < this.gameObjects.length; i++) {
                    this.gameObjects[i].update();
                }

                this.renderer.update(this.gameObjects);


            }
            

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


        prevSpawnTime: number = 0;
        nextSpawnTime: number = 3000;
        interval: number = 13500;
        minSpawnTime = 1000;

        spawner(distribution) {
            if (this.gameOver) {
                return;
            }
            if (this.game.time.time - this.prevSpawnTime > this.interval && this.game.time.time - this.prevSpawnTime > this.minSpawnTime) {
                this.prevSpawnTime = this.game.time.time;
                this.interval *= 0.952;
            }

            else {
                return;
            }

            this.incomingSound.play();

            var rng = Math.random();
            var heli: boolean = false; //isHeli

            if (rng > distribution) {
                heli = true;
            }
            rng = Math.random();

            var x;
            var y;
            var rng2 = Math.random();

            if (rng < 0.20) {
                x = -70;
                y = rng2 * this.game.height;
            }
            else if (rng < 0.5) {
                y = this.game.height + 70;
                x = rng2 * this.game.width;

            }
            else if (rng < 0.8) {
                y = -70;
                x = rng2 * this.game.width;
            }
            else {
                x = this.game.width + 70;
                y = rng2 * this.game.height;
            }

            var direction = new Phaser.Point();
            direction.x = Math.random() + 0.05;
            direction.y = Math.random() + 0.05;
            //direction.x = this.game.width * 0.5 + Math.random() * 800 - 400 - x;
            //direction.y = this.game.height * 0.5 + Math.random() * 550 - 225 - y;

            this.spawn(x, y, 0xffffff, direction, heli);
        }
    }









}

