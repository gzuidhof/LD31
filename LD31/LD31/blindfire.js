var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Blindfire;
(function (_Blindfire) {
    var Blindfire = (function (_super) {
        __extends(Blindfire, _super);
        function Blindfire() {
            _super.call(this, 800, 600, Phaser.AUTO, 'content', null, true);
            this.renderer = new PIXI.WebGLRenderer(800, 600, { transparent: true, clearBeforeRender: false });
            this.state.add('Boot', _Blindfire.Boot, false);
            this.state.add('Preloader', _Blindfire.Preloader, false);
            this.state.add('MainMenu', _Blindfire.MainMenu, false);
            // this.state.add('Level1', Level1, false);
            this.state.add('Level', _Blindfire.Level, false);
            this.state.start('Boot');
        }
        return Blindfire;
    })(Phaser.Game);
    window.onload = function () {
        var game = new Blindfire();
    };
})(Blindfire || (Blindfire = {}));
var Blindfire;
(function (Blindfire) {
    var Level = (function (_super) {
        __extends(Level, _super);
        function Level() {
            _super.apply(this, arguments);
            this.i = 0;
        }
        Level.prototype.create = function () {
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
        };
        Level.prototype.update = function () {
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
        };
        Level.prototype.render = function () {
            this.bmd.draw(this.watchWindowBitmap);
            this.watchWindowBitmap.clear();
            //this.watchWindowBitmap.clear();
            //this.watchWindowBitmap.setHSL(0, 0, 1);
            // this.watchWindowBitmap.draw(this.
            //this.watchWindowBitmap.fill(1, 1, 1, 0.01);
            //this.watchWindowBitmap.clear();
            //this.watchWindowBitmap.fill(1, 1, 1, 0);
            //var renderTexture = new PIXI.RenderTexture(this.game.width, this.game.height);
        };
        return Level;
    })(Phaser.State);
    Blindfire.Level = Level;
})(Blindfire || (Blindfire = {}));
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
var Blindfire;
(function (Blindfire) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.preload = function () {
            this.load.image('preloadBar', 'assets/loader.png');
        };
        Boot.prototype.create = function () {
            //  Unless you specifically need to support multitouch I would recommend setting this to 1
            this.input.maxPointers = 1;
            //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
            this.stage.disableVisibilityChange = true;
            this.game.state.start('Preloader', true, false);
        };
        return Boot;
    })(Phaser.State);
    Blindfire.Boot = Boot;
})(Blindfire || (Blindfire = {}));
var Blindfire;
(function (Blindfire) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            _super.apply(this, arguments);
        }
        MainMenu.prototype.create = function () {
            this.background = this.add.sprite(0, 0, 'titlepage');
            this.background.alpha = 0;
            this.logo = this.add.sprite(this.world.centerX, -300, 'logo');
            this.logo.anchor.setTo(0.5, 0.5);
            this.add.tween(this.background).to({ alpha: 1 }, 2000, Phaser.Easing.Bounce.InOut, true);
            this.add.tween(this.logo).to({ y: 220 }, 2000, Phaser.Easing.Elastic.Out, true, 2000);
            this.input.onDown.addOnce(this.fadeOut, this);
        };
        MainMenu.prototype.fadeOut = function () {
            this.add.tween(this.background).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
            var tween = this.add.tween(this.logo).to({ y: 800 }, 2000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startGame, this);
        };
        MainMenu.prototype.startGame = function () {
            this.game.state.start('Level1', true, false);
        };
        return MainMenu;
    })(Phaser.State);
    Blindfire.MainMenu = MainMenu;
})(Blindfire || (Blindfire = {}));
var Blindfire;
(function (Blindfire) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
        }
        Preloader.prototype.preload = function () {
            //  Set-up our preloader sprite
            this.preloadBar = this.add.sprite(200, 250, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);
            //  Load our actual games assets
            this.load.image('logo', 'assets/logo.png');
            this.load.audio('music', 'assets/title.mp3', true);
            this.load.image('cat_eyes', 'assets/cat_eyes.jpg');
        };
        Preloader.prototype.create = function () {
            //var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            // tween.onComplete.add(this.startMainMenu, this);
            this.startMainMenu();
        };
        Preloader.prototype.startMainMenu = function () {
            // this.game.state.start('MainMenu', true, false);
            this.game.state.start('Level', true, false);
        };
        return Preloader;
    })(Phaser.State);
    Blindfire.Preloader = Preloader;
})(Blindfire || (Blindfire = {}));
//# sourceMappingURL=blindfire.js.map