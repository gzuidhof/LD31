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
            this.load.image('tutlevel', 'assets/tutlevel.png');
            this.load.image('block', 'assets/block.png');
            this.load.image('ship1', 'assets/ship1.png');
            this.load.image('ship2', 'assets/ship2.png');
            this.load.image('window', 'assets/window.png');
            this.load.image('runway', 'assets/runway.png');
            this.load.image('helipad', 'assets/helipad.png');
            this.load.image('landicon', 'assets/landicon.png');
            this.load.image('circle', 'assets/circle.png');
            this.load.image('heli', 'assets/heli.png');

            this.load.image('heli0', 'assets/heli0.png');
            this.load.image('heli1', 'assets/heli1.png');
            this.load.image('heli2', 'assets/heli2.png');
            this.load.image('heli3', 'assets/heli3.png');
            this.load.image('heli4', 'assets/heli4.png');
            this.load.image('heli5', 'assets/heli5.png');
            

        }

        create() {

            //var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            // tween.onComplete.add(this.startMainMenu, this);
            this.startMainMenu();
        }

        startMainMenu() {

           // this.game.state.start('MainMenu', true, false);
            this.game.state.start('MainLevel', true, false);
            //this.game.state.start('TutLevel', true, false);
        }

    }

}