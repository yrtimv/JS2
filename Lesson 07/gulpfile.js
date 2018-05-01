// Main gulp and plugins consts.
const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const csso = require('gulp-csso');
const del = require('del');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const pngquant = require('imagemin-pngquant');
const minifier = require('gulp-minifier');
const minifierOpts = {
	minify: true,
	minifyJS: {

	}
};
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();

// Aux. consts for settings.
const path = require('path');
const paths = {
	dev: {
		root: './dev/',
		sass: 'sass/**/*.scss',
		js: 'js/**/*.js',
		img: 'img/**/*',
		html: '**/*.html'
	},
	dist: {
		root: './dist/',
		styles: 'styles/',
		scripts: 'scripts/',
		packages: 'packages/',
		images: 'images/'
	},
	vendor: {
		js: './vendor/**/*.js',
		css: './vendor/**/*.css',
	}
};


// Gulp task queue.

// Task: clean up dist folder.
gulp.task('clean', function() {
	return del(paths.dist.root);
});

// Task: sass compile.
gulp.task('sass', function() {
	return gulp
		.src(path.join(__dirname, paths.dev.root, paths.dev.sass))
		.pipe(sass())
		.pipe(csso())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(path.join(__dirname, paths.dist.root, paths.dist.styles)))
		.pipe(browserSync.reload({stream: true}));
});

// Task: dev js minimize.
gulp.task('dev_js', function() {
	return gulp
		.src(path.join(__dirname, paths.dev.root, paths.dev.js))
		.pipe(minifier(minifierOpts))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(path.join(__dirname, paths.dist.root, paths.dist.scripts)))
		.pipe(browserSync.reload({stream: true}));
});

// Task: vendor js minimize.
gulp.task('vendor_js', function() {
	return gulp
		.src(path.join(__dirname, paths.vendor.js))
		.pipe(minifier(minifierOpts))
		.pipe(gulp.dest(path.join(
			__dirname, paths.dist.root, paths.dist.packages)));
});

// Task: vendor css minimize.
gulp.task('vendor_css', function() {
	return gulp
		.src(path.join(__dirname, paths.vendor.css))
		.pipe(csso())
		.pipe(gulp.dest(path.join(
			__dirname, paths.dist.root, paths.dist.packages)));
});

// Task: images optimization.
gulp.task('img', function() {
	return gulp
		.src(path.join(__dirname, paths.dev.root, paths.dev.img))
		.pipe(imagemin({use: [pngquant()]}))
		.pipe(gulp.dest(path.join(__dirname, paths.dist.root, paths.dist.images)))
		.pipe(browserSync.reload({stream: true}));
});

// Task: html minimize.
gulp.task('html', function() {
	return gulp
		.src(path.join(__dirname, paths.dev.root, paths.dev.html))
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest(path.join(__dirname, paths.dist.root)))
		.pipe(browserSync.reload({stream: true}));
});

// Task: watch for changes in dev folder.
gulp.task('watch', function() {
	const watch_tasks = [
		{
			watch: paths.dev.root + paths.dev.html,
			task: 'html'
		},
		{
			watch: paths.dev.root + paths.dev.img,
			task: 'img'
		},
		{
			watch: paths.dev.root + paths.dev.sass,
			task: 'sass'
		},
		{
			watch: paths.dev.root + paths.dev.js,
			task: 'dev_js'
		}
	];

	browserSync.init({server: path.join(__dirname, paths.dist.root)});

	watch_tasks.forEach((elem) => {
		console.log(`Watching "${elem.watch}" for changes...`);
		gulp.watch(elem.watch, gulp.series(elem.task));
	});
});

// Task: default task for production.
gulp.task('default', gulp.series(['clean', gulp.parallel(['sass', 'dev_js', 'vendor_js', 'vendor_css', 'html', 'img']), 'watch']));
