module FlyingBlind {

    export class MainMenu extends Phaser.State {

        map1: Phaser.Sprite;
        map2: Phaser.Sprite;

        create() {


            var s = this.add.sprite(this.world.centerX, this.world.centerY, 'tut1');
            s.anchor.set(0.5, 0.5);


            //this.add.tween(this.logo).to({ y: 220 }, 2000, Phaser.Easing.Elastic.Out, true, 2000);

            this.input.onDown.addOnce(() => { this.game.world.remove(s); this.next() }, this);

        }

        next() {
            var s = this.add.sprite(this.world.centerX, this.world.centerY, 'tut2');
            s.anchor.set(0.5, 0.5);

            this.input.onDown.addOnce(() => { this.game.world.remove(s); this.showMaps() }, this);

        }

        showMaps() {
            this.map1 = this.add.sprite(this.world.centerX, this.world.centerY + 144, 'background');
            this.map1.scale.set(0.4, 0.4);
            this.map2 = this.add.sprite(this.world.centerX, this.world.centerY - 144, 'tutlevel');
            this.map2.scale.set(0.4, 0.4);

            this.map1.alpha = 0;
            this.map2.alpha = 0;
            this.map1.anchor.set(0.5, 0.5);
            this.map2.anchor.set(0.5, 0.5);

            this.add.tween(this.map1).to({ alpha: 1 }, 1000, Phaser.Easing.Cubic.In, true);
            this.add.tween(this.map2).to({ alpha: 1 }, 1000, Phaser.Easing.Cubic.In, true);

            this.input.onDown.addOnce(this.fadeOut, this);
        }


        fadeOut() {
            var tween = this.add.tween(this.map1).to({ y: this.map1.position.y + 1000 }, 2000, Phaser.Easing.Sinusoidal.Out, true);
            var tween = this.add.tween(this.map2).to({ y: this.map1.position.y -1000 }, 2000, Phaser.Easing.Sinusoidal.Out, true);

            if (this.input.y > this.world.centerY) {
                tween.onComplete.add(() => this.startGame('MainLevel'), this);

            }
            else {
                tween.onComplete.add(() => this.startGame('TutLevel'), this);
            }

        }

        startGame(level:string) {
            this.game.state.start(level, true, false);
        }



    }
}