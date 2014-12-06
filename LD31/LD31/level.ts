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
            
            //this.background.mask = screenMask;

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
            //watchWindowBitmap.addToWorld();
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

                this.bmd.draw(this.watchWindowBitmap);
            }
            if (this.i % 18 == 0) {
                this.bmd.blendOverlay();
                this.bmd.fill(0.1, 0.1, 0.1, 0.01);

                this.bmd.blendReset();
                this.bmd.draw(this.watchWindowBitmap);
            }


        }

        render() {
            this.bmd.draw(this.watchWindowBitmap);
            
            this.watchWindowBitmap.clear();
            
            //this.watchWindowBitmap.clear();
            //this.watchWindowBitmap.setHSL(0, 0, 1);


            // this.watchWindowBitmap.draw(this.
            //this.watchWindowBitmap.fill(1, 1, 1, 0.01);
            //this.watchWindowBitmap.clear();
            //this.watchWindowBitmap.fill(1, 1, 1, 0);
            //var renderTexture = new PIXI.RenderTexture(this.game.width, this.game.height);




        }

    }




}

/*
    - 



*/

// Fragment shaders are small programs that run on the graphics card and alter
// the pixels of a texture. Every framework implements shaders differently but
// the concept is the same. This shader takes the lightning texture and alters
// the pixels so that it appears to be glowing. Shader programming itself is
// beyond the scope of this tutorial.
//
// There are a ton of good resources out there to learn it. Odds are that your
// framework already includes many of the most popular shaders out of the box.
//
// This is an OpenGL/WebGL feature. Because it runs in your web browser
// you need a browser that support WebGL for this to work.
var Glow = function (game) {
    Phaser.Filter.call(this, game);

    this.fragmentSrc = [
        "precision lowp float;",
        "varying vec2 vTextureCoord;",
        "varying vec4 vColor;",
        'uniform sampler2D uSampler;',

        'void main() {',
        'vec4 sum = vec4(0);',
        'vec2 texcoord = vTextureCoord;',
        'for(int xx = -4; xx <= 4; xx++) {',
        'for(int yy = -3; yy <= 3; yy++) {',
        'float dist = sqrt(float(xx*xx) + float(yy*yy));',
        'float factor = 0.0;',
        'if (dist == 0.0) {',
        'factor = 2.0;',
        '} else {',
        'factor = 2.0/abs(float(dist));',
        '}',
        'sum += texture2D(uSampler, texcoord + vec2(xx, yy) * 0.002) * factor;',
        '}',
        '}',
        'gl_FragColor = sum * 0.025 + texture2D(uSampler, texcoord);',
        '}'
    ];
};

Glow.prototype = Object.create(Phaser.Filter.prototype);
Glow.prototype.constructor = Glow;