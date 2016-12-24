/* KUTE.js - The Light Tweening Engine
 * by dnp_theme
 * package - pluginName
 * desc - what your plugin does
 * pluginName by yourNickname aka YOUR NAME
 * Licensed under MIT-License
 */

(function (root,factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kute.js'], factory);
  } else if(typeof module == 'object' && typeof require == 'function') {
    module.exports = factory(require('kute.js'));
  } else if ( typeof root.KUTE !== 'undefined' ) {  
    factory(root.KUTE);
  } else {
    throw new Error("pluginName require KUTE.js.");
  }
}(this, function (KUTE) {
  var Tween = KUTE.Tween;

  Tween.prototype.reverse = function(){
    for (var p in this.valuesEnd) {
      var tmp = this.valuesRepeat[p]; // we cache this object first
      this.valuesRepeat[p] = this.valuesEnd[p];
      this.valuesEnd[p] = tmp;
      this.valuesStart[p] = this.valuesRepeat[p];
    }
    return this;
  };

  Tween.prototype.seek = function (time) {
    this._startTime -= time;
    return this;
  };

  Tween.prototype.restart = function(){
    if (this.playing) {
      this.stop();
      this.start();
    }
    return this;
  };


  return this;
}));