require('./node_modules/laravel-mix/src/index');
Mix.paths.setRootPath(path.resolve(__dirname));

module.exports = require('laravel-mix/setup/webpack.config.js');
