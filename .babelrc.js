module.exports = {
  "comments": false,
  "env": {
    "test": {
      "presets": [
        ["babel-preset-env",
        {
          "useBuiltIns": "entry",
          "targets": {
            "browsers": ["last 2 versions"]
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
            "browsers": ["last 2 versions"]
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
            "browsers": ["last 2 versions"]
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
            "browsers": ["last 2 versions"]
          }
        }]
      ]
    }
  },
  "plugins": ["transform-runtime"]
}
