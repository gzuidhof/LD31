var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var FlyingBlind;
(function (_FlyingBlind) {
    var FlyingBlind = (function (_super) {
        __extends(FlyingBlind, _super);
        function FlyingBlind() {
            _super.call(this, 1024, 720, Phaser.AUTO, 'content', null, true);
            this.renderer = new PIXI.WebGLRenderer(1024, 700, { transparent: true, clearBeforeRender: false });
            this.state.add('Boot', _FlyingBlind.Boot, false);
            this.state.add('Preloader', _FlyingBlind.Preloader, false);
            this.state.add('MainMenu', _FlyingBlind.MainMenu, false);
            // this.state.add('Level1', Level1, false);
            this.state.add('MainLevel', _FlyingBlind.MainLevel, false);
            console.log("go");
            this.state.start('Boot');
        }
        return FlyingBlind;
    })(Phaser.Game);
    window.onload = function () {
        var game = new FlyingBlind();
    };
})(FlyingBlind || (FlyingBlind = {}));
var FlyingBlind;
(function (FlyingBlind) {
    var GoldenColorGenerator = (function () {
        function GoldenColorGenerator() {
        }
        GoldenColorGenerator.generateColor = function () {
            this.h += this.golden_ratio_conjugate;
            this.h %= 1;
            return hsvToRgb(this.h * 360, 100, 0.98 * 100);
        };
        GoldenColorGenerator.generateColor32bitEncoded = function () {
            var col = this.generateColor();
            return col[0] << 16 | col[1] << 8 | col[2];
        };
        //Generate (next) random color given golden ratio conjugate
        GoldenColorGenerator.golden_ratio_conjugate = 0.618033988749895;
        GoldenColorGenerator.h = 0.52;
        return GoldenColorGenerator;
    })();
    FlyingBlind.GoldenColorGenerator = GoldenColorGenerator;
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
})(FlyingBlind || (FlyingBlind = {}));
var FlyingBlind;
(function (FlyingBlind) {
    var Guidable = (function (_super) {
        __extends(Guidable, _super);
        function Guidable(game, x, y, key, color, heli) {
            var _this = this;
            _super.call(this, game, x, y, key);
            this.hitboxRadius = 20;
            this.speed = 1;
            this.drawing = false;
            this.velocity = new Phaser.Point(0, 0);
            this.landing = false;
            this.onMouseClick = function (guidable, pointer) {
                if (_this.landing) {
                    return;
                }
                console.log("click on plane!");
                _this.drawing = true;
                _this.navNodes = [];
            };
            this.onMouseRelease = function () {
                //console.log("release");
                _this.drawing = false;
            };
            this.color = color;
            this.tint = color;
            this.anchor.setTo(0.5, 0.5);
            this.scale.set(0.70, 0.70);
            this.heli = heli;
            this.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.navNodes = [];
        }
        Guidable.prototype.startLanding = function (direction, landCallback) {
            this.landing = true;
            this.drawing = false;
            this.navNodes = [];
            this.velocity = direction;
            this.landCallback = landCallback;
        };
        Guidable.prototype.update = function () {
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
                var vel = this.navNodes[0].clone().subtract(this.position.x, this.position.y);
                this.velocity = vel;
            }
            if (this.x + this.hitboxRadius * 0.6 > this.game.width) {
                this.navNodes = [];
                this.velocity.x = -Math.abs(this.velocity.y);
            }
            else if (this.x - this.hitboxRadius * 0.6 < 0) {
                this.navNodes = [];
                this.velocity.x = Math.abs(this.velocity.x);
            }
            if (this.y + this.hitboxRadius * 0.6 > this.game.height) {
                this.navNodes = [];
                this.velocity.y = -Math.abs(this.velocity.y);
            }
            else if (this.y - this.hitboxRadius * 0.6 < 0) {
                this.navNodes = [];
                this.velocity.y = Math.abs(this.velocity.y);
            }
            this.updateRotation();
            this.velocity.setMagnitude(this.speed);
            this.position = this.position.add(this.velocity.x, this.velocity.y);
        };
        Guidable.prototype.updateRotation = function () {
            if (this.velocity.x != 0 && this.velocity.y != 0) {
                this.rotation = this.game.physics.arcade.moveToXY(this, this.x + this.velocity.x, this.y + this.velocity.y, this.speed, 10);
            }
        };
        return Guidable;
    })(Phaser.Sprite);
    FlyingBlind.Guidable = Guidable;
})(FlyingBlind || (FlyingBlind = {}));
var FlyingBlind;
(function (FlyingBlind) {
    var GameLevel = (function (_super) {
        __extends(GameLevel, _super);
        function GameLevel() {
            var _this = this;
            _super.apply(this, arguments);
            this.gameObjects = [];
            this.guidables = [];
            this.runways = [];
            this.onLandingFinished = function (guidable) {
                //Todo points!
                _this.removeFromList(guidable, _this.guidables);
                _this.removeFromList(guidable, _this.gameObjects);
            };
            this.handleMouseDown = function () {
                _this.gameObjects.forEach(function (val) {
                    if (val.hitboxRadius && val.onMouseClick) {
                        if (_this.game.input.mousePointer.position.distance(val.position) < val.hitboxRadius) {
                            val.onMouseClick();
                        }
                    }
                });
            };
            this.handleMouseUp = function () {
                _this.gameObjects.forEach(function (val) {
                    if (val.onMouseRelease) {
                        val.onMouseRelease();
                    }
                });
            };
            this.maxSpeed = 10;
            this.velocity = new Phaser.Point(0, 0);
            this.snapiness = 0.008;
        }
        GameLevel.prototype.addToGame = function (e) {
            this.gameObjects.push(e);
            this.gameObjects.sort(function (a, b) { return a.z - b.z; });
        };
        GameLevel.prototype.addGuidable = function (x, y, asset, color, heli) {
            var sprite = new FlyingBlind.Guidable(this.game, x, y, asset, color, heli);
            this.addToGame(sprite);
            this.guidables.push(sprite);
        };
        GameLevel.prototype.addRunway = function (x, y, dx, dy, type, color) {
            var sprite = new FlyingBlind.Runway(this.game, x, y, dx, dy, color);
            this.addToGame(sprite);
            this.runways.push(sprite);
        };
        GameLevel.prototype.checkForLandings = function () {
            var _this = this;
            this.guidables.forEach(function (plane) {
                _this.runways.forEach(function (runway) {
                    if (runway.checkLanded(plane)) {
                        plane.startLanding(runway.direction, _this.onLandingFinished);
                    }
                });
            });
        };
        GameLevel.prototype.checkForCollisions = function () {
            for (var i = 0; i < this.guidables.length; i++) {
                for (var j = i + 1; j < this.guidables.length; j++) {
                    //if (j !== i) {
                    var planeA = this.guidables[i];
                    var planeB = this.guidables[j];
                    if (!planeA.landing && !planeB.landing) {
                        if (planeA.position.distance(planeB.position) < 34.5) {
                            this.onCollision(planeA, planeB);
                        }
                    }
                }
            }
        };
        GameLevel.prototype.onCollision = function (planeA, planeB) {
            console.log('Collision!');
        };
        GameLevel.prototype.removeFromList = function (el, l) {
            var index = l.indexOf(el);
            if (index > -1) {
                l.splice(index, 1);
            }
        };
        GameLevel.prototype.create = function () {
            var game = this.game;
            game.physics.startSystem(Phaser.Physics.ARCADE);
            this.maskRect = new Phaser.Rectangle(0, 0, 326, 220);
            this.renderer = new FlyingBlind.MemoryRenderer(game, this.maskRect);
            this.renderer.drawAllNoMask(this.gameObjects);
            //this.game.input.ad
            this.game.input.onDown.add(this.handleMouseDown);
            this.game.input.onUp.add(this.handleMouseUp);
            this.windowSprite = this.game.add.sprite(0, 0, 'window');
            this.windowSprite.anchor.set(0.5, 0.5);
        };
        GameLevel.prototype.update = function () {
            var mousePos = new Phaser.Point(this.game.input.x, this.game.input.y);
            // console.log('x' + mousePos.x);
            // console.log('y' + mousePos.y);
            var curPos = new Phaser.Point(this.maskRect.centerX, this.maskRect.centerY);
            var desiredVel = mousePos.subtract(curPos.x, curPos.y).multiply(0.2, 0.2);
            if (desiredVel.getMagnitude() > this.maxSpeed) {
                desiredVel.normalize().setMagnitude(this.maxSpeed);
            }
            this.velocity = this.interpPoints(this.velocity, desiredVel, this.game.time.elapsed * this.snapiness);
            this.maskRect.centerOn(curPos.x + this.velocity.x, (curPos.y + this.velocity.y));
            this.windowSprite.position.set(this.maskRect.centerX, this.maskRect.centerY);
            this.checkForLandings();
            this.checkForCollisions();
            for (var i = 0; i < this.gameObjects.length; i++) {
                this.gameObjects[i].update();
            }
            this.renderer.update(this.gameObjects);
        };
        GameLevel.prototype.render = function () {
            this.renderer.render();
        };
        GameLevel.prototype.interpPoints = function (a, b, t) {
            return a.setTo(this.interp(a.x, b.x, t), this.interp(a.y, b.y, t));
        };
        GameLevel.prototype.interp = function (a, b, t) {
            t = Math.max(0, Math.min(t, 1));
            return a + t * (b - a);
        };
        return GameLevel;
    })(Phaser.State);
    FlyingBlind.GameLevel = GameLevel;
})(FlyingBlind || (FlyingBlind = {}));
var FlyingBlind;
(function (FlyingBlind) {
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
    FlyingBlind.Boot = Boot;
})(FlyingBlind || (FlyingBlind = {}));
var FlyingBlind;
(function (FlyingBlind) {
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
    FlyingBlind.MainMenu = MainMenu;
})(FlyingBlind || (FlyingBlind = {}));
var FlyingBlind;
(function (FlyingBlind) {
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
            this.load.audio('music', 'assets/title.mp3', true);
            this.load.image('background', 'assets/background.png');
            this.load.image('tutlevel', 'assets/tutlevel.png');
            this.load.image('block', 'assets/block.png');
            this.load.image('ship1', 'assets/ship1.png');
            this.load.image('ship2', 'assets/ship2.png');
            this.load.image('window', 'assets/window.png');
            this.load.image('runway', 'assets/runway.png');
            this.load.image('helipad', 'assets/helipad.png');
            this.load.image('landicon', 'assets/landicon.png');
        };
        Preloader.prototype.create = function () {
            //var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            // tween.onComplete.add(this.startMainMenu, this);
            this.startMainMenu();
        };
        Preloader.prototype.startMainMenu = function () {
            // this.game.state.start('MainMenu', true, false);
            this.game.state.start('MainLevel', true, false);
        };
        return Preloader;
    })(Phaser.State);
    FlyingBlind.Preloader = Preloader;
})(FlyingBlind || (FlyingBlind = {}));
var FlyingBlind;
(function (FlyingBlind) {
    var MainLevel = (function (_super) {
        __extends(MainLevel, _super);
        function MainLevel() {
            _super.apply(this, arguments);
        }
        MainLevel.prototype.create = function () {
            this.background = this.game.make.sprite(0, 0, 'background');
            this.addToGame(this.background);
            this.addRunway(296, 195, 1, 0, 'runway', FlyingBlind.GoldenColorGenerator.generateColor32bitEncoded());
            this.addRunway(390, 100, 1, 1, 'runway', FlyingBlind.GoldenColorGenerator.generateColor32bitEncoded());
            this.addRunway(821, 279, -1, 1, 'runway', FlyingBlind.GoldenColorGenerator.generateColor32bitEncoded());
            this.addRunway(392, 613, 1, -1, 'runway', FlyingBlind.GoldenColorGenerator.generateColor32bitEncoded());
            _super.prototype.create.call(this);
            this.addGuidable(50, 50, 'ship2', 0xeeeeee, false);
            this.addGuidable(100, 50, 'ship2', 0xffffff, true);
        };
        return MainLevel;
    })(FlyingBlind.GameLevel);
    FlyingBlind.MainLevel = MainLevel;
})(FlyingBlind || (FlyingBlind = {}));
var FlyingBlind;
(function (FlyingBlind) {
    var MemoryRenderer = (function () {
        function MemoryRenderer(game, screenRect) {
            this.frame = 0;
            this.game = game;
            this.init(game);
            this.maskRect = screenRect;
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
            var bmd = game.add.bitmapData(game.width, game.height);
            bmd.fill(1, 1, 1, 1);
            bmd.addToWorld();
            this.bmd = bmd;
        };
        MemoryRenderer.prototype.update = function (drawList) {
            var _this = this;
            var game = this.game;
            this.frame++;
            this.gameBmd.clear();
            drawList.forEach(function (val) {
                _this.gameBmd.blendReset();
                _this.gameBmd.draw(val, val.x, val.y);
                if (val.navNodes) {
                    _this.gameBmd.blendAdd();
                    _this.drawNavLines(val);
                }
            });
            this.watchWindowBitmap = this.watchWindowBitmap.alphaMask(this.gameBmd, this.mask, null, this.maskRect);
            if (this.frame % 3 == 0) {
                this.bmd.blendSaturation();
                this.bmd.fill(0, 0, 0, 0.03);
            }
            //if (this.frame % 20 == 0) {
            //    this.bmd.blendOverlay();
            //    this.bmd.fill(0.1, 0.1, 0.1, 0.003);
            //
            //}
            this.bmd.blendReset();
            this.bmd.draw(this.watchWindowBitmap);
        };
        MemoryRenderer.prototype.drawAllNoMask = function (drawList) {
            var _this = this;
            drawList.forEach(function (val) {
                _this.bmd.draw(val, val.x, val.y);
            });
        };
        MemoryRenderer.prototype.render = function () {
            this.watchWindowBitmap.clear();
        };
        MemoryRenderer.prototype.drawNavLines = function (guidable) {
            if (!guidable.navNodes[0]) {
                return;
            }
            var graph = this.game.make.graphics(0, 0);
            graph.lineStyle(8, 0xffffff, 0.4);
            graph.moveTo(guidable.navNodes[0].x, guidable.navNodes[0].y);
            for (var i = 0; i < guidable.navNodes.length; i++) {
                // graph.lineTo(guidable.navNodes[i].x, guidable.navNodes[i].y );
                // graph.drawRect(guidable.navNodes[i].x - 2, guidable.navNodes[i].y - 2, 4, 4);
                graph.drawCircle(guidable.navNodes[i].x, guidable.navNodes[i].y, 2);
            }
            var topleft = this.calcTopLeft(guidable.navNodes);
            var sprite = this.game.make.sprite(0, 0, graph.generateTexture(null, null, null));
            // sprite.width = 
            //sprite.anchor.set(0.5, 0.5);
            this.gameBmd.draw(sprite, topleft.x, topleft.y);
        };
        MemoryRenderer.prototype.calcTopLeft = function (points) {
            var lowestX = 10000000000;
            var lowestY = 10000000000;
            for (var i = 0; i < points.length; i++) {
                if (points[i].x < lowestX) {
                    lowestX = points[i].x;
                }
                if (points[i].y < lowestY) {
                    lowestY = points[i].y;
                }
            }
            return new Phaser.Point(lowestX, lowestY);
        };
        return MemoryRenderer;
    })();
    FlyingBlind.MemoryRenderer = MemoryRenderer;
})(FlyingBlind || (FlyingBlind = {}));
var FlyingBlind;
(function (FlyingBlind) {
    var Runway = (function (_super) {
        __extends(Runway, _super);
        function Runway(game, x, y, dx, dy, color) {
            _super.call(this, game, x, y, 'landicon');
            this.direction = new Phaser.Point(dx, dy);
            this.anchor.set(0.5, 0.5);
            this.color = color;
            this.tint = color;
            this.alpha = 0;
            this.rotation = this.game.physics.arcade.angleToXY(this, this.x + this.direction.x, this.y + this.direction.y);
            this.scale = new Phaser.Point(0.2, 0.2);
        }
        Runway.prototype.checkLanded = function (plane) {
            if (this.position.distance(plane.position) < 18.5) {
                if (Math.abs(this.angleBetween(plane.velocity, this.direction)) < 0.6) {
                    //console.log('angle' + this.angleBetween(plane.velocity, this.direction) + ' dirX ' + plane.velocity.x + ' dirY ' + plane.velocity.y);
                    return true;
                }
            }
            return false;
        };
        Runway.prototype.angleBetween = function (a, b) {
            var dotProd = a.dot(b);
            var lenProd = a.getMagnitude() * b.getMagnitude();
            var divOperation = dotProd / lenProd;
            return Math.acos(divOperation);
        };
        return Runway;
    })(Phaser.Sprite);
    FlyingBlind.Runway = Runway;
})(FlyingBlind || (FlyingBlind = {}));
//# sourceMappingURL=flyingblind.js.map