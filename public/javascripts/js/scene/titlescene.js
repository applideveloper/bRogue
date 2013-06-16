/**
 * TitleScene
 */
(function(ns) {

    ns.TitleScene = tm.createClass({
        superClass : tm.app.TitleScene,

        init : function() {
            this.superInit({
                title :  "RoguePlus",
                width :  ns.SCREEN_WIDTH,
                height : ns.SCREEN_HEIGHT
            });

            // セーブされている階層があるか調べる
            var saveData = this._loadSaveData();
            if (saveData) {
                var stairs = saveData.saveData.stairs;
            }
            else {
                var stairs = 2; // 1階から開始
            }

            this.addEventListener("pointingend", function(e) {
                // シーンの切り替え
                var loadingScene = ns.AsyncLoading({
                    width:        e.app.width,
                    height:       e.app.height,
                    assets:       MAIN_ASSET,
                    loadingScene: ns.EffectLoadingScene,
                    nextScene:    ns.MainScene,
                },function (postLoadingFunc) {
                    var self = this;
                    var socket = self.socket;
                    socket.emit("getMapData", stairs);
                    // mapデータ取得
                    socket.on("gotMapData", function (data) {
                        console.log("gotMapData");
                        this.mapData = data;
                        postLoadingFunc();
                    }.bind(self));
                }.bind(ns.gameEvent));
                e.app.replaceScene(loadingScene);
            });
        },

        // MainSceneと処理もろかぶり...　あとで考える
        _loadSaveData: function () {
            // ローカルストレージからデータを取得
            var loadLocalStorage = localStorage["RoguePlus"];
            if (loadLocalStorage) {
                return JSON.parse(loadLocalStorage);
            }
            else {
                return null;
            }
        },
    });

})(game);