module Blindfire {
    export class Level extends Phaser.State {

        background: Phaser.Sprite;
        logo: Phaser.Sprite;

        group: Phaser.Group;
        mask: Phaser.Graphics;

        renderer: MemoryRenderer;

        



        create() {

            var game = this.game;
            

            this.logo = this.game.add.sprite(10, 10, 'logo');
            this.background = this.game.make.sprite(0, 0, 'cat_eyes');
            var block = this.game.make.sprite(0, 0, 'block');
            var block2 = this.game.make.sprite(50, 30, 'block');

            this.renderer = new MemoryRenderer(game);
            this.renderer.add(this.background);
            this.renderer.add(block);
            this.renderer.add(block2);
            
           // this.renderer.add(this.background);
            
        }

        i = 0;

        update() {
            this.renderer.update();
        }

        render() {
            this.renderer.render();
        }

    }




}
