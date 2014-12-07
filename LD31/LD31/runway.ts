﻿module FlyingBlind {
    export class Runway extends Phaser.Sprite {

        direction: Phaser.Point

        constructor(game, x, y, dx, dy) {
            super(game, x, y, 'landicon');
            this.direction = new Phaser.Point(dx, dy);
            this.anchor.set(0.5, 0.5);

            this.rotation =  this.game.physics.arcade.angleToXY(this, this.x + this.direction.x, this.y + this.direction.y);
            this.scale = new Phaser.Point(0.2, 0.2);
        }

        checkLanded(plane : Guidable): boolean {
            if (this.position.distance(plane.position) < 18.5) {
                
                if (Math.abs(this.angleBetween(plane.velocity,this.direction)) < 0.6) {
                    console.log('angle' + this.angleBetween(plane.velocity, this.direction) + ' dirX ' + plane.velocity.x + ' dirY ' + plane.velocity.y);
                    return true;
                }
            }

            return false;
        }


        angleBetween(a: Phaser.Point, b: Phaser.Point) {
        var dotProd = a.dot(b);
        var lenProd = a.getMagnitude() * b.getMagnitude();
        var divOperation = dotProd / lenProd;
        return Math.acos(divOperation)/* * (180.0 / Math.PI)*/;
     }





    }

}