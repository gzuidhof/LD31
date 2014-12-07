module FlyingBlind {

    export class Preloader extends Phaser.State {

        preloadBar: Phaser.Sprite;

        preload() {

            //  Set-up our preloader sprite
            this.preloadBar = this.add.sprite(200, 250, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);

            //  Load our actual games assets
            this.load.audio('music', 'assets/title.mp3', true);
            this.load.image('background', 'assets/background.png');
            this.load.image('block', 'assets/block.png');
            this.load.image('ship1', 'assets/ship1.png');
            this.load.image('ship2', 'assets/ship2.png');
            this.load.image('window', 'assets/window.png');
            this.load.image('runway', 'assets/runway.png');
            this.load.image('helipad', 'assets/helipad.png');
            

        }

        create() {

            //var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            // tween.onComplete.add(this.startMainMenu, this);
            this.startMainMenu();
        }

        startMainMenu() {

           // this.game.state.start('MainMenu', true, false);
            this.game.state.start('Level', true, false);
        }

    }

}