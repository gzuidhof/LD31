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


        }


        update() {
            super.update();
            this.spawner(0.75);
        }



    }


}