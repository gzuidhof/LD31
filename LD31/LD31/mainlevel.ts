module FlyingBlind {
    export class MainLevel extends GameLevel {

        create() {
            this.background = this.game.make.sprite(0, 0, 'background');
            this.addToGame(this.background);

            this.addRunway(100, 100, 1, 0, 'runway', GoldenColorGenerator.generateColor32bitEncoded());


            super.create();

            this.addGuidable(50, 50, 'ship2', 0xffffff);
            this.addGuidable(100, 50, 'ship2', 0xffffff);



        }
    }


}