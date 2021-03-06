/**
 * LizardManNormal
 */

var tmlib = require('tmlib');
var tm = tmlib.tm;
Math = tmlib.Math;
var Enemy = require('./../enemy.js').Enemy;

(function(ns) {

	ns.LizardManNormal = tm.createClass({
		superClass : Enemy,

		init: function () {
			this.superInit();

			this.maxhp = 60;
			this.hp    = 60;
			this.maxmp = 0;
			this.mp    = 0;

			this._str  = 22; // 攻撃力
			this._def  = 12; // 防御力
			// this._int = 1; // 魔力
			this._agi  = 0; // 素早さ
			this._luk  = 0; // 運
			this._vit  = 0; // 体力
			this._dex  = 0; // 器用さ

			this.exp = 5; // 倒した時の経験値

			this.speed = 3;
			this.velocity = tm.geom.Vector2(0, 0);

			this.dropItemList = [
				{
					itemName: "刀",
					random: 7
				},{
					itemName: "肉",
					random: 5
				},{
					itemName: "革の鎧",
					random: 5
				}
			];
		}
	});

})(exports);