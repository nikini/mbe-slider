/**
 * Gulp Webpack buikd
 * Builds the JS (minifies, bundles etc) ready for deployment
 * =============================================================================
 */
const standardGulp = require('gulp');
const gulp = require('gulp-help')(standardGulp);
const webpack = require('webpack');
const gutil = require('gulp-util');
const webpackConfig = require('./../webpack.config.js');

gulp.task('webpack:build', 'Builds the JS (minifies, bundles etc) ready for deployment', (callback) => {
	// Modify some webpack config options
	const myConfig = Object.create(webpackConfig);

	// Remove the devtool
	myConfig.devtool = undefined;

	myConfig.plugins = myConfig.plugins.concat(
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
			},
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true,
		}),
		new webpack.optimize.UglifyJsPlugin({
			mangle: false,
			compress: {
				warnings: false,
			},
		}));

	// Run webpack
	webpack(myConfig, (err, stats) => {
		if (err)
			throw new gutil.PluginError('webpack:build', err);

		gutil.log('[webpack:build]', stats.toString({
			colors: true,
		}));
		callback();
	});
});
