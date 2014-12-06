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
            _super.call(this, 800, 600, Phaser.AUTO, 'content', null);
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
        }
        Level.prototype.create = function () {
            this.background = this.game.add.sprite(0, 0, 'cat_eyes');
            var screenView = this.game.add.graphics(0, 0);
            screenView.beginFill();
            //screenView.lineStyle(2, 0xff0000, 1);
            screenView.drawRect(-100, -100, 200, 200);
            screenView.endFill();
            this.screenMask = screenView;
            this.background.mask = screenView;
        };
        Level.prototype.update = function () {
            this.screenMask.position.copyFrom(this.game.input.mousePointer.position);
        };
        Level.prototype.render = function () {
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