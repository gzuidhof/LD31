module FlyingBlind {
    export class MainLevel extends GameLevel {

        create() {
            this.background = this.game.make.sprite(0, 0, 'background');
            this.addToGame(this.background);

            this.addRunway(296, 195, 1, 0, 'runway', GoldenColorGenerator.generateColor32bitEncoded(), false);
            this.addRunway(390, 100, 1, 1, 'runway', GoldenColorGenerator.generateColor32bitEncoded(), false);

            this.addRunway(821, 279, -1, 1, 'runway', GoldenColorGenerator.generateColor32bitEncoded(), false);
            this.addRunway(392, 613, 1, -1, 'runway', GoldenColorGenerator.generateColor32bitEncoded(), false);
            
            this.addRunway(307, 288, 0, 0, 'runway', GoldenColorGenerator.generateColor32bitEncoded(), true);
            this.addRunway(307, 374, 0, 0, 'runway', GoldenColorGenerator.generateColor32bitEncoded(), true);

            super.create();

            this.addGuidable(50, 50, 0xffffff, false);
            this.addGuidable(100, 50, 0xffffff, true);


        }


        update() {

            super.update();
            this.spawner();
        }

        prevSpawnTime: number = 0;
        nextSpawnTime: number = 3000;
        interval: number = 15500;

        spawner() {

            if (this.prevSpawnTime + this.nextSpawnTime < this.game.time.time) {
                this.prevSpawnTime = this.game.time.time;
                this.nextSpawnTime = this.interval;
                this.interval *= 0.96;
            }

            else {
                return;
            }

           

            var rng = Math.random();
            var heli: boolean = false; //isHeli

            if (rng > 0.75) {
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
            direction.x = Math.random();
            direction.y = Math.random();
            //direction.x = this.game.width * 0.5 + Math.random() * 800 - 400 - x;
            //direction.y = this.game.height * 0.5 + Math.random() * 550 - 225 - y;

            this.spawn(x, y, 0xffffff, direction, heli);
        }



    }


}