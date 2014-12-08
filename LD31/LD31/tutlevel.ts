module FlyingBlind {
    export class TutLevel extends GameLevel {

        create() {

            this.background = this.game.make.sprite(0, 0, 'tutlevel');
            this.addToGame(this.background);

            this.addRunway(394, 309, 1, -1, 'runway', GoldenColorGenerator.generateColor32bitEncoded(), true);
            this.addRunway(307, 341, 1, -1, 'runway', GoldenColorGenerator.generateColor32bitEncoded(), true);



            this.addRunway(295, 504, 681-295, 299-504, 'runway', GoldenColorGenerator.generateColor32bitEncoded(), false);

            super.create();
            this.minSpawnTime = 2;
            this.interval = 14000;
        }

        update() {
            super.update();
            this.spawner(0.50);
            
        }


    }


}