﻿module FlyingBlind {
    export class Guidable extends Phaser.Sprite implements Clickable{

        navNodes: Phaser.Point[];
        hitboxRadius = 20;

        speed = 1;
        drawing: boolean = false;
        velocity = new Phaser.Point(0, 0);
        color: number;

        landing: boolean = false;
        landCallback: (g: Guidable) => void;

        heli: boolean;

        constructor(game: Phaser.Game, x: number, y: number, key, color, heli) {
            super(game, x, y, key);
            this.color = color;
            this.tint = color;
            this.anchor.setTo(0.5, 0.5);
            this.scale.set(0.70, 0.70);
            this.heli = heli;

            

            this.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.navNodes = [];

        }

        onMouseClick = (guidable, pointer) => {
            if (this.landing) {
                return;
            }
            console.log("click on plane!");
            this.drawing = true;
            this.navNodes = [];
        }

        onMouseRelease = () => {
            //console.log("release");
            this.drawing = false;
        }

        startLanding(direction: Phaser.Point, landCallback) {
            this.landing = true;
            this.drawing = false;
            this.navNodes = [];
            this.velocity = direction;
            this.landCallback = landCallback;
        }


        
        update() {

            if (this.landing) {
              //  this.speed = 1;
                this.speed -= 0.13 * (this.game.time.elapsed / 1000);
                if (this.scale.getMagnitude() > 0.6) {
                    this.scale.x -= 0.10 * (this.game.time.elapsed / 1000);
                    this.scale.y -= 0.10 * (this.game.time.elapsed / 1000);
                }

                if (this.speed < 0.05) {
                    console.log("cleaning up plane");
                    this.landCallback(this);
                }
                
                
                this.navNodes = [];
            }


            if (this.drawing) {
                if (this.navNodes.length > 0) {
                    if (this.navNodes[this.navNodes.length - 1].distance(this.game.input.activePointer.position) > 15) {
                        this.navNodes.push(this.game.input.activePointer.position.clone());
                    }
                }
                else {
                    this.navNodes.push(this.game.input.activePointer.position.clone());
                }
            }

            
            while (this.navNodes.length > 0 && this.position.distance(this.navNodes[0]) < 22) {
                this.navNodes.shift();
            }


            if (this.navNodes.length == 0) {
                
                if (this.heli) {
                    this.velocity = new Phaser.Point(0, 0);
                }
            }
            else {

                
                var vel: Phaser.Point = this.navNodes[0].clone().subtract(this.position.x, this.position.y);
                this.velocity = vel;
            }

            

            if (this.x + this.hitboxRadius * 0.6 > this.game.width) {
                this.navNodes = [];
                this.velocity.x = -Math.abs(this.velocity.y);
            }
            else if (this.x - this.hitboxRadius * 0.6 < 0 ) {
                this.navNodes = [];
                this.velocity.x = Math.abs(this.velocity.x);
            }

            if (this.y + this.hitboxRadius * 0.6> this.game.height) {
                this.navNodes = [];
                this.velocity.y = -Math.abs(this.velocity.y);
            }
            else if (this.y - this.hitboxRadius*0.6< 0) {
                this.navNodes = [];
                this.velocity.y = Math.abs(this.velocity.y);
            }




            this.updateRotation();

            this.velocity.setMagnitude(this.speed);
            this.position = this.position.add(this.velocity.x, this.velocity.y);
        }

        updateRotation() {
            if (this.velocity.x != 0 && this.velocity.y != 0) {
                this.rotation = this.game.physics.arcade.moveToXY(this, this.x + this.velocity.x, this.y + this.velocity.y, this.speed, 10);
            }
        }

    }

}