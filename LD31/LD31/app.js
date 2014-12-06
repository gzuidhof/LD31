var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Blindfire;
(function (Blindfire) {
    var LD31 = (function (_super) {
        __extends(LD31, _super);
        function LD31() {
            _super.call(this, 800, 600, Phaser.AUTO, 'content', null);
        }
        return LD31;
    })(Phaser.Game);
    window.onload = function () {
        var el = document.getElementById('content');
        var game = new LD31();
    };
})(Blindfire || (Blindfire = {}));
//# sourceMappingURL=app.js.map