module Blindfire {
    export class MemoryRenderer {

        game: Phaser.Game;
        maskRect: Phaser.Rectangle;


        watchWindowBitmap: Phaser.BitmapData;
        bmd: Phaser.BitmapData;
        mask: Phaser.BitmapData;

        gameGroup: Phaser.Group;

        frame: number;

        constructor(game: Phaser.Game) {
            this.game = game;
            this.init(game);
        }

        init(game: Phaser.Game) {

            
            this.gameGroup = this.game.make.group(null);
            
            var watchWindowBitmap = game.add.bitmapData(game.width, game.height);
            


            var bmd = game.add.bitmapData(game.width, game.height);
            bmd.fill(1, 1, 1, 1);
            bmd.addToWorld();
            this.bmd = bmd;


            this.watchWindowBitmap = watchWindowBitmap;
            this.watchWindowBitmap.addToWorld();
            //this.watchWindowBitmap.fill(1, 1, 0, 0);
            var mask = game.add.bitmapData(1, 1);
            this.mask = mask;
            this.mask.fill(1, 0, 0, 1);
            this.maskRect = new Phaser.Rectangle(0, 0, 100, 100);
            //this.watchWindowBitmap.alphaMask(this.background, this.mask, null, this.maskRect);

        }

        add(e: PIXI.DisplayObject) {
            this.gameGroup.add(e);
            
        }



        update() {
            var game = this.game;

            var t = this.gameGroup.generateTexture(null, null, game.renderer);
            var s = new Phaser.Sprite(game, 0, 0, t);


            this.frame++;
            this.maskRect.centerOn(this.game.input.x, this.game.input.y);
            // this.watchWindowBitmap.alphaMask(image, this.mask, null, this.maskRect);
            this.watchWindowBitmap.draw(s);
            

            if (this.frame % 6 == 0) {
                this.bmd.blendSaturation();
                this.bmd.fill(0, 0, 0, 0.030);
                this.bmd.blendReset();
            }
            if (this.frame % 18 == 0) {
                this.bmd.blendOverlay();
                this.bmd.fill(0.1, 0.1, 0.1, 0.01);

                this.bmd.blendReset();

            }

            this.bmd.draw(this.watchWindowBitmap);
        }


        render() {
            this.watchWindowBitmap.clear();
        }

    }

}