module Blindfire {
    export class Guidable extends Phaser.Sprite{

        constructor(game: Phaser.Game, x: number, y: number, key, color) {
            super(game, x, y, key);
            this.tint = color;
            
        }
        
        update() {

        }



    }

}