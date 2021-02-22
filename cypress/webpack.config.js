module.exports = {
    resolve: {
        extensions: ['.ts', '.js', '.json'],
    },
    node: { fs: 'empty', readline: 'empty' },
    module: {
        rules: [
            {
                test: /\.ts$/,
                include: [/cypress/],
                exclude: [/node_modules/],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [['react-app', { typescript: true }]],
                        },
                    },
                ],
            },
        ],
    },
};
