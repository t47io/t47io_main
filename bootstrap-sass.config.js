const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  bootstrapVersion: 3,
  styleLoader: ExtractTextPlugin.extract('css!sass'),

  debug: false, 
  extractStyles: true,

  scripts: false,
  // scripts: {
  //   "transition": false,
  //   "alert": false,
  //   "button": true,
  //   "carousel": true,
  //   "collapse": false,
  //   "dropdown": true,
  //   "modal": false,
  //   "tooltip": false,
  //   "popover": false,
  //   "scrollspy": true,
  //   "tab": false,
  //   "affix": false
  // },
  styles: {
    "mixins": true,
    "normalize": true,
    "utilities": true,
    "responsive-utilities": true,

    "buttons": true,
    "carousel": true,
    "code": true,
    "dropdowns": true,
    "forms": true,
    "grid": true,
    "input-groups": true,
    "jumbotron": true,
    "labels": true,
    "navs": true,
    "navbar": true,
    "scaffolding": true,
    "thumbnails": true,
    "type": true,

    "alerts": false,
    "badges": false,
    "breadcrumbs": false,
    "button-groups": false,
    "close": false,
    "component-animations": false,
    "glyphicons": false,
    "list-group": false,
    "media": false,
    "modals": false,
    "pager": false,
    "pagination": false,
    "panels": false,
    "popovers": false,
    "print": false,
    "progress-bars": false,
    "responsive-embed": false,
    "tables": false,
    "tooltip": false,
    "wells": false
  }
};
