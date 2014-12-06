module Blindfire {
    export class Level extends Phaser.State {

        background: Phaser.Sprite;
        logo: Phaser.Sprite;

        renderTexture: PIXI.RenderTexture;

        
        watchWindowBitmap: Phaser.BitmapData;
        mask: Phaser.BitmapData;
        maskRect: Phaser.Rectangle;

        bmd: Phaser.BitmapData;

        create() {

            var game = this.game;

            this.logo = this.game.add.sprite(10, 10, 'logo');
            this.background = this.game.make.sprite(0, 0, 'cat_eyes');

            var watchWindowBitmap = game.add.bitmapData(game.width, game.height);

            var bmd = game.add.bitmapData(game.width, game.height);
            bmd.fill(1, 1, 1, 1);
            bmd.addToWorld();
            this.bmd = bmd;

            
            this.watchWindowBitmap = watchWindowBitmap;
            this.watchWindowBitmap.fill(1, 1, 1, 0);
            var mask = game.add.bitmapData(1, 1);
            this.mask = mask;
            this.mask.fill(1, 0, 0, 1);
            this.maskRect = new Phaser.Rectangle(0, 0, 100, 100);
            this.watchWindowBitmap.alphaMask(this.background, this.mask, null, this.maskRect);

        }

        i = 0;

        update() {
            this.maskRect.centerOn(this.input.x, this.input.y);
            this.watchWindowBitmap.alphaMask(this.background, this.mask, null, this.maskRect);
            this.i++;

            if (this.i % 6 == 0) {
                this.bmd.blendSaturation();
                this.bmd.fill(0, 0, 0, 0.030);
                this.bmd.blendReset();
            }
            if (this.i % 18 == 0) {
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
