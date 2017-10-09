/**
 * Gulp Webpack watch
 * Starts the webpack watch
 * =============================================================================
 */
const standardGulp = require('gulp');
const gulp = require('gulp-help')(standardGulp);
const argv = require('yargs').argv;
const spawn = require('child_process').spawn;

gulp.task('webpack:watch', 'Start webpack watch', () => {
	const args = ['--color'];
	if (!argv.single)
		args.push('--watch');

	const webpackWatch = spawn('webpack', args);

	webpackWatch.stdout.on('data', (data) => {
		console.log(`${data}`);
	});

	webpackWatch.stderr.on('data', (data) => {
		console.log(`Error: ${data}`);
	});

	webpackWatch.on('close', (code) => {
		console.log(`Webpack process exited with code ${code}`);
		process.exit(code);
	});
});
