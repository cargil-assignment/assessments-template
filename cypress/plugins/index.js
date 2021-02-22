const webpack = require('@cypress/webpack-preprocessor');

module.exports = (on, config) => {
    const options = {
        webpackOptions: require('../webpack.config'),
    };

    require('@cypress/code-coverage/task')(on, config);
    on('file:preprocessor', webpack(options));

    return config;
};
