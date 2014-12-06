module Blindfire {
    export class Level extends Phaser.State {

        screenMask: Phaser.Graphics;
        background: Phaser.Sprite;


        create() {
            this.background = this.game.add.sprite(0, 0, 'cat_eyes');

            var screenView = this.game.add.graphics(0, 0);
            screenView.beginFill();
            //screenView.lineStyle(2, 0xff0000, 1);
            screenView.drawRect(-100, -100, 200, 200);
            screenView.endFill();
            this.screenMask = screenView;

            this.background.mask = screenView;
        }

        update() {
            this.screenMask.position.copyFrom( this.game.input.mousePointer.position) ;

        }

        render() {
            
        }

    }




}