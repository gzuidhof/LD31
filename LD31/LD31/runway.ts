module FlyingBlind {
    export class Runway extends Phaser.Sprite {

        direction: Phaser.Point

        constructor(game, x, y, dx, dy) {
            super(game, x, y, 'landicon');
            this.direction = new Phaser.Point(dx, dy);
            this.anchor.set(0.5, 0.5);
        }

        checkLanded(plane : Guidable): boolean {
            if (this.position.distance(plane.position) < 18.5) {
                //console.log(plane.velocity.angle(this.direction, true));
                return Math.abs(plane.velocity.angle(this.direction, true)) > 75;
            }

            return false;
        }




    }

}