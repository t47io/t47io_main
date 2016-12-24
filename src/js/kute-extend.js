/* KUTE.js - The Light Tweening Engine
 * by dnp_theme
 * package - pluginName
 * desc - what your plugin does
 * pluginName by yourNickname aka YOUR NAME
 * Licensed under MIT-License
 */

(function(root,factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kute.js'], factory);
  } else if(typeof module == 'object' && typeof require == 'function') {
    module.exports = factory(require('kute.js'));
  } else if ( typeof root.KUTE !== 'undefined' ) {  
    factory(root.KUTE);
  } else {
    throw new Error("pluginName require KUTE.js.");
  }
}(this, function(KUTE) {
  var Tween = KUTE.Tween;
  var protoTweenList = Object.getPrototypeOf(KUTE.allTo("body", {}, {}));

  Tween.prototype.reverse = function() {
    var that = Object.assign({}, this);
    Object.setPrototypeOf(that, Tween.prototype);
    that.valuesEnd = this.valuesStart;
    that.valuesStart = this.valuesEnd;
    return that;
  };

  Tween.prototype.seek = function(time) {
    this._startTime -= time;
    return this;
  };

  Tween.prototype.restart = function() {
    if (this.playing) {
      this.stop();
      this.start();
    }
    return this;
  };


  KUTE.util = {
    flattenTweens: function(tweenList) {
      tweenList = tweenList.map(function(tween) { return tween.tweens || tween; })
      return [].concat.apply([], tweenList);
    },
    chainTweens: function(tweenList) {
      if (tweenList.length === 1) {
        return tweenList[0];
      } else {
        var obj = {tweens: tweenList};
        Object.setPrototypeOf(obj, protoTweenList);
        return obj;
      }
    },
    reverseTweens: function(tweenList) {
      tweenList = KUTE.util.flattenTweens(tweenList);
      var tweenReverse = tweenList.filter(function(tween) { return tween.options.hasOwnProperty('reversable'); });
      tweenReverse = tweenReverse.map(function(tween) { return tween.reverse(); });
      return tweenReverse;
    }
  };

  return this;
}));

