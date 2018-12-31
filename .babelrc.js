const BabelEsmPlugin = require('babel-esm-plugin');
module.exports = {
  "comments": false,
  "env": {
    "test": {
      "presets": [
        ["babel-preset-env",
        {
          "useBuiltIns": "entry",
          "targets": {
            "browsers": ["last 2 versions", "Electron"]
          }
        }]
      ],
    },
    "main": {
      "presets": [
        ["babel-preset-env",
        {
          "useBuiltIns": "entry",
          "targets": {
            "browsers": ["last 2 versions", "Electron"]
          }
        }]
      ]
    },
    "renderer": {
      "presets": [
        ["babel-preset-env",
        {
          "useBuiltIns": "entry",
          "targets": {
            "browsers": ["last 2 versions", "Electron"]
          }
        }]
      ],
      
    },
    "web": {
      "presets": [
        ["babel-preset-env",
        {
          "useBuiltIns": "entry",
          "targets": {
            "browsers": ["last 2 versions", "Electron"]
          }
        }]
      ]
    }
  },
  "plugins": ["transform-runtime",new BabelEsmPlugin()]
}
