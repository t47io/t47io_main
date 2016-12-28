const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  bootstrapVersion: 3,
  styleLoader: ExtractTextPlugin.extract('css!sass'),

  debug: false, 
  extractStyles: true,
  useFlexbox: true,

  scripts: {
    "transition": false,
    "alert": false,
    "button": true,
    "carousel": true,
    "collapse": false,
    "dropdown": true,
    "modal": false,
    "tooltip": false,
    "popover": false,
    "scrollspy": true,
    "tab": false,
    "affix": false
  },
  styles: {
    "mixins": true,

    "normalize": true,
    "print": false,
    "glyphicons": false,

    "scaffolding": true,
    "type": true,
    "code": true,
    "grid": true,
    "tables": false,
    "forms": true,
    "buttons": true,

    "component-animations": true,
    "dropdowns": true,
    "button-groups": false,
    "input-groups": true,
    "navs": true,
    "navbar": true,
    "breadcrumbs": false,
    "pagination": false,
    "pager": false,
    "labels": true,
    "badges": false,
    "jumbotron": true,
    "thumbnails": true,
    "alerts": false,
    "progress-bars": true,
    "media": false,
    "list-group": false,
    "panels": false,
    "wells": false,
    "responsive-embed": false,
    "close": true,

    "modals": false,
    "tooltip": false,
    "popovers": false,
    "carousel": true,

    "utilities": true,
    "responsive-utilities": true
  }
};
