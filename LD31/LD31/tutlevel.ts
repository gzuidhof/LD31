module FlyingBlind {
    export class TutLevel extends GameLevel {

        create() {

            this.background = this.game.make.sprite(0, 0, 'tutlevel');
            this.addToGame(this.background);

            this.addRunway(394, 309, 1, -1, 'runway', GoldenColorGenerator.generateColor32bitEncoded(), true);
            this.addRunway(307, 341, 1, -1, 'runway', GoldenColorGenerator.generateColor32bitEncoded(), true);



            this.addRunway(295, 504, 681-295, 299-504, 'runway', GoldenColorGenerator.generateColor32bitEncoded(), false);

            super.create();

            this.addGuidable(50, 50, 0xeeeeee, false);
            this.addGuidable(100, 50, 0xffffff, true);

        }

    }


}