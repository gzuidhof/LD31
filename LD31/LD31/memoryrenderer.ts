module Blindfire {
    export class MemoryRenderer {

        game: Phaser.Game;
        maskRect: Phaser.Rectangle;


        watchWindowBitmap: Phaser.BitmapData;
        bmd: Phaser.BitmapData;
        mask: Phaser.BitmapData;

        gameBmd: Phaser.BitmapData;

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




        update(drawList: any[]) {
            var game = this.game;


            this.frame++;

            this.gameBmd.clear();
            
            drawList.forEach((val) => {
                this.gameBmd.blendReset();
                this.gameBmd.draw(val, val.x, val.y);
                if (val.navNodes) {
                    this.gameBmd.blendAdd();
                    this.drawNavLines(val);
                }
            });

            this.watchWindowBitmap = this.watchWindowBitmap.alphaMask(this.gameBmd, this.mask, null, this.maskRect);


          //  if (this.frame % 1 == 0) {
                this.bmd.blendSaturation();
                this.bmd.fill(0, 0, 0, 0.03);
                this.bmd.blendReset();
           // }
            if (this.frame % 20 == 0) {
                this.bmd.blendOverlay();
                this.bmd.fill(0.1, 0.1, 0.1, 0.003);

                this.bmd.blendReset();

            }

            this.bmd.draw(this.watchWindowBitmap);
        }


        drawAllNoMask(drawList: any[]) {
            drawList.forEach((val) => {
                this.bmd.draw(val, val.x, val.y);
            });
        }

        render() {
            this.watchWindowBitmap.clear();
        }

        drawNavLines(guidable: Guidable) {
            if (!guidable.navNodes[0]) {
                return;

            }



            var graph = this.game.make.graphics(0, 0);

            graph.lineStyle(3, guidable.color, 0.8);
            
            graph.moveTo(guidable.navNodes[0].x, guidable.navNodes[0].y);
            //graph.lineTo(guidable.navNodes[0].x, guidable.navNodes[0].y);
            for (var i = 0; i < guidable.navNodes.length; i++) {
                graph.lineTo(guidable.navNodes[i].x, guidable.navNodes[i].y );
               // graph.drawRect(guidable.navNodes[i].x - 2, guidable.navNodes[i].y - 2, 4, 4);
               // graph.drawCircle(guidable.navNodes[i].x, guidable.navNodes[i].y, 2);
            }

            var topleft = this.calcTopLeft(guidable.navNodes);

            var sprite = this.game.make.sprite(0, 0, graph.generateTexture(null, null, null));
            
           // sprite.width = 
            //sprite.anchor.set(0.5, 0.5);
            this.gameBmd.draw(sprite, topleft.x, topleft.y);
            
        }

        calcTopLeft(points: Phaser.Point[]) {
            var lowestX = 10000000000;
            var lowestY = 10000000000;

            for(var i = 0; i < points.length; i++) {
                if (points[i].x < lowestX) {
                    lowestX = points[i].x;
                }
                if (points[i].y < lowestY) {
                    lowestY = points[i].y;
                }
            }
            return new Phaser.Point(lowestX, lowestY);

        }


    }

}