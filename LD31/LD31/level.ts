module Blindfire {
    export class Level extends Phaser.State {

        background: Phaser.Sprite;
        logo: Phaser.Sprite;

        group: Phaser.Group;
        mask: Phaser.Graphics;

        //renderer: MemoryRenderer;

        



        create() {

            var game = this.game;
            

            this.logo = this.game.add.sprite(10, 10, 'logo');
            this.background = this.game.make.sprite(0, 0, 'cat_eyes');
            var block = this.game.make.sprite(0, 0, 'block');

            this.group = this.game.add.group(block);
            this.group.add(this.background);
            this.group.add(block);
            
            
            this.mask = new Phaser.Graphics(this.game, 0, 0);
            this.mask.beginFill(0xffffff);
            this.mask.drawRect(-100, -100, 5, 100);
            this.mask.endFill();

            this.game.add.existing(block);

            this.group.mask = this.mask


           // var bmd = game.make.bitmapData(game.width, game.height);
           // bmd.draw(this.group);
            //bmd.addToWorld();
           // bmd.fill(0, 0, 0, 0.5);

            //game.add.image(game.world.centerX, 220, bmd);

            //this.renderer = new MemoryRenderer(game);
            
        }

        i = 0;

        update() {
            //this.renderer.update();
        }

        render() {
            //this.renderer.render();
        }

    }




}
