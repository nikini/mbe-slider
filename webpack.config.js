/**
 * Webpack Config
 *
 * @author Ciprian Mocanu <ciprian@mbe.ro>
 * =============================================================================
 */
const path = require('path');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const SassLintPlugin = require('sasslint-webpack-plugin');

const jsPath = path.resolve(__dirname, './src');
const excludePath = /(node_modules|bower_components)/;

module.exports = {
    name: 'cip-slider',

    devtool: '#cheap-source-map',

    entry: [
        './src/slider.js',
    ],

    output: {
        path: `${__dirname}/build`,
        filename: '[name].bundle.js',
    },

    resolve: {
        modules: [
            './src',
            './node_modules',
        ],
        extensions: ['.js'],
    },

    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: excludePath,
                loader: 'eslint-loader',
            },
            {
                test: /\.js$/,
                exclude: excludePath,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                enforce: 'pre',
                test: /\.html$/,
                exclude: excludePath,
                loader: 'htmlhint-loader',
            },
            {
                test: /\.scss$/,
                exclude: excludePath,
                use: [{
                    // creates style nodes from JS strings
                    loader: 'style-loader',
                }, {
                    // translates CSS into CommonJS
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                    },
                }, {
                    // Post CSS (for autoprefixer)
                    loader: 'postcss-loader',
                    options: {
                        plugins() {
                            return [
                                precss,
                                autoprefixer({
                                    browsers: ['last 2 versions', '> 5%', 'ie 9', 'ie 10', 'ie 11'],
                                }),
                            ];
                        },
                    },
                }, {
                    // compiles Sass to CSS
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true,
                        includePaths: [jsPath],
                    },
                }],
            },
        ],
    },

    plugins: [
        new SassLintPlugin({
            configFile: '.sass-lint.yml',
            glob: 'src/**/*.s?(a|c)ss',
        }),
    ],
};
