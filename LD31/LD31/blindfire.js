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
    var GoldenColorGenerator = (function () {
        function GoldenColorGenerator() {
        }
        GoldenColorGenerator.generateColor = function () {
            this.h = this.golden_ratio_conjugate;
            this.h %= 1;
            hsvToRgb(this.h * 360, 0.9 * 100, 0.95 * 100);
        };
        //Generate (next) random color given golden ratio conjugate
        GoldenColorGenerator.golden_ratio_conjugate = 0.618033988749895;
        GoldenColorGenerator.h = 0.5;
        return GoldenColorGenerator;
    })();
    Blindfire.GoldenColorGenerator = GoldenColorGenerator;
    /**
* HSV to RGB color conversion
*
* H runs from 0 to 360 degrees
* S and V run from 0 to 100
*
* Ported from the excellent java algorithm by Eugene Vishnevsky at:
* http://www.cs.rit.edu/~ncs/color/t_convert.html
*/
    function hsvToRgb(h, s, v) {
        var r, g, b;
        var i;
        var f, p, q, t;
        // Make sure our arguments stay in-range
        h = Math.max(0, Math.min(360, h));
        s = Math.max(0, Math.min(100, s));
        v = Math.max(0, Math.min(100, v));
        // We accept saturation and value arguments from 0 to 100 because that's
        // how Photoshop represents those values. Internally, however, the
        // saturation and value are calculated from a range of 0 to 1. We make
        // That conversion here.
        s /= 100;
        v /= 100;
        if (s == 0) {
            // Achromatic (grey)
            r = g = b = v;
            return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
        }
        h /= 60; // sector 0 to 5
        i = Math.floor(h);
        f = h - i; // factorial part of h
        p = v * (1 - s);
        q = v * (1 - s * f);
        t = v * (1 - s * (1 - f));
        switch (i) {
            case 0:
                r = v;
                g = t;
                b = p;
                break;
            case 1:
                r = q;
                g = v;
                b = p;
                break;
            case 2:
                r = p;
                g = v;
                b = t;
                break;
            case 3:
                r = p;
                g = q;
                b = v;
                break;
            case 4:
                r = t;
                g = p;
                b = v;
                break;
            default:
                r = v;
                g = p;
                b = q;
        }
        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }
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
            var block = this.game.make.sprite(0, 0, 'block');
            var block2 = this.game.make.sprite(50, 30, 'block');
            this.renderer = new Blindfire.MemoryRenderer(game);
            this.renderer.add(this.background);
            this.renderer.add(block);
            this.renderer.add(block2);
            // this.renderer.add(this.background);
        };
        Level.prototype.update = function () {
            this.renderer.update();
        };
        Level.prototype.render = function () {
            this.renderer.render();
        };
        return Level;
    })(Phaser.State);
    Blindfire.Level = Level;
})(Blindfire || (Blindfire = {}));
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
            this.load.image('block', 'assets/block.png');
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
var Blindfire;
(function (Blindfire) {
    var MemoryRenderer = (function () {
        function MemoryRenderer(game) {
            this.drawObjects = [];
            this.frame = 0;
            this.game = game;
            this.init(game);
        }
        MemoryRenderer.prototype.init = function (game) {
            this.gameGroup = this.game.make.group(null);
            var watchWindowBitmap = game.make.bitmapData(game.width, game.height);
            this.gameBmd = game.make.bitmapData(game.width, game.height);
            this.watchWindowBitmap = watchWindowBitmap;
            this.watchWindowBitmap.fill(1, 1, 0, 0);
            var mask = game.add.bitmapData(1, 1);
            this.mask = mask;
            this.mask.fill(0, 0, 0, 1);
            this.maskRect = new Phaser.Rectangle(0, 0, 100, 100);
            var bmd = game.add.bitmapData(game.width, game.height);
            bmd.fill(1, 1, 1, 1);
            bmd.addToWorld();
            this.bmd = bmd;
        };
        MemoryRenderer.prototype.add = function (e) {
            this.drawObjects.push(e);
            this.drawObjects.sort(function (a, b) { return a.z - b.z; });
        };
        MemoryRenderer.prototype.update = function () {
            var _this = this;
            var game = this.game;
            this.frame++;
            this.maskRect.centerOn(this.game.input.x, this.game.input.y);
            this.gameBmd.clear();
            //this.watchWindowBitmap.clear();
            this.drawObjects.forEach(function (val) {
                _this.gameBmd.blendAdd();
                _this.gameBmd.draw(val, val.x, val.y);
            });
            this.watchWindowBitmap = this.watchWindowBitmap.alphaMask(this.gameBmd, this.mask, null, this.maskRect);
            if (this.frame % 6 == 0) {
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
        };
        MemoryRenderer.prototype.render = function () {
            this.watchWindowBitmap.clear();
        };
        return MemoryRenderer;
    })();
    Blindfire.MemoryRenderer = MemoryRenderer;
})(Blindfire || (Blindfire = {}));
//# sourceMappingURL=blindfire.js.map