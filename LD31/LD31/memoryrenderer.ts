﻿module Blindfire {
    export class MemoryRenderer {

        game: Phaser.Game;
        maskRect: Phaser.Rectangle;


        watchWindowBitmap: Phaser.BitmapData;
        bmd: Phaser.BitmapData;
        mask: Phaser.BitmapData;

        gameBmd: Phaser.BitmapData;


        drawObjects: Phaser.Sprite[] = [];

        gameGroup: Phaser.Group;

        frame: number = 0;

        constructor(game: Phaser.Game, screenRect: Phaser.Rectangle) {
            this.game = game;
            this.init(game);
            this.maskRect = screenRect;
        }

        init(game: Phaser.Game) {

            
            this.gameGroup = this.game.make.group(null);
            
            var watchWindowBitmap = game.make.bitmapData(game.width, game.height);
            this.gameBmd = game.make.bitmapData(game.width, game.height);
            


            this.watchWindowBitmap = watchWindowBitmap;
            
            this.watchWindowBitmap.fill(1, 1, 0, 0);
            var mask = game.add.bitmapData(1, 1);
            this.mask = mask;
            
            this.mask.fill(0, 0, 0, 1);
            

            
            var bmd = game.add.bitmapData(game.width, game.height);
            bmd.fill(1, 1, 1, 1);
            bmd.addToWorld();
            this.bmd = bmd;
        }

        add(e: Phaser.Sprite) {
            this.drawObjects.push(e);
            this.drawObjects.sort((a, b) => a.z - b.z); 
        }



        update() {
            var game = this.game;


            this.frame++;
            


            this.gameBmd.clear();
            //this.watchWindowBitmap.clear();
            this.drawObjects.forEach((val) => {
               // this.gameBmd.blendReset();
                this.gameBmd.draw(val, val.x, val.y);
            });

            this.watchWindowBitmap = this.watchWindowBitmap.alphaMask(this.gameBmd, this.mask, null, this.maskRect);



            if (this.frame % 2 == 0) {
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