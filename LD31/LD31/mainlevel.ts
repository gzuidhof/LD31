module FlyingBlind {
    export class MainLevel extends GameLevel {

        create() {
            this.background = this.game.make.sprite(0, 0, 'background');
            this.addToGame(this.background);

            this.addRunway(296, 195, 1, 0, 'runway', GoldenColorGenerator.generateColor32bitEncoded());
            this.addRunway(390, 100, 1, 1, 'runway', GoldenColorGenerator.generateColor32bitEncoded());

            this.addRunway(821, 279, -1, 1, 'runway', GoldenColorGenerator.generateColor32bitEncoded());
            this.addRunway(392, 613, 1, -1, 'runway', GoldenColorGenerator.generateColor32bitEncoded());
            //392 613

            super.create();

            this.addGuidable(50, 50, 'ship2', 0xffffff);
            this.addGuidable(100, 50, 'ship2', 0xffffff);



        }
    }


}