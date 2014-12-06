module Blindfire {

    class Blindfire extends Phaser.Game {

        constructor() {
            super(800, 600, Phaser.AUTO, 'content', null, true);
            this.renderer = new PIXI.WebGLRenderer(800, 600, { transparent: true, clearBeforeRender: false });

            this.state.add('Boot', Boot, false);
            this.state.add('Preloader', Preloader, false);
            this.state.add('MainMenu', MainMenu, false);
            // this.state.add('Level1', Level1, false);
            this.state.add('Level', Level, false);


            this.state.start('Boot');
        }
    }

    window.onload = () => {
        var game = new Blindfire();
    };
}