module FlyingBlind {

    export class Preloader extends Phaser.State {

        preloadBar: Phaser.Sprite;

        preload() {

            //  Set-up our preloader sprite
            this.preloadBar = this.add.sprite(200, 250, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);

            //  Load our actual games assets
            this.load.image('background', 'assets/background.png');
            this.load.image('tutlevel', 'assets/tutlevel.png');
            this.load.image('ship2', 'assets/ship2.png');
            this.load.image('window', 'assets/window.png');
            this.load.image('landicon', 'assets/landicon.png');
            this.load.image('circle', 'assets/circle.png');
            this.load.image('heli', 'assets/heli.png');
            this.load.image('explosionicon', 'assets/explosionicon.png');

            this.load.image('tut1', 'assets/tut1.png');
            this.load.image('tut2', 'assets/tut2.png');

            this.load.image('heli0', 'assets/heli0.png');
            this.load.image('heli1', 'assets/heli1.png');
            this.load.image('heli2', 'assets/heli2.png');
            this.load.image('heli3', 'assets/heli3.png');
            this.load.image('heli4', 'assets/heli4.png');
            this.load.image('heli5', 'assets/heli5.png');

            this.load.audio('explosion', 'assets/explosion.wav', true);

            this.load.audio('music', 'assets/music.ogg', true);
            this.load.audio('land', 'assets/land.ogg', true);
            this.load.audio('score', 'assets/score.ogg', true);
            this.load.audio('incoming', 'assets/test.ogg', true);


        }

        create() {

            //var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            // tween.onComplete.add(this.startMainMenu, this);
            this.startMainMenu();
        }

        startMainMenu() {

            this.game.state.start('MainMenu', true, false);

        }

    }

}