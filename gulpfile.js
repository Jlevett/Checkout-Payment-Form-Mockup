/*Automation tools*/

/*
npm install gulp --save-dev//////////
npm install browser-sync --save-dev////////
npm install gulp-uglify --save-dev////////////
npm install gulp-sourcemaps
npm install gulp-concat --save-dev
npm install --save-dev babel-cli
npm install --save-dev gulp-babel babel-core babel-preset-env
*/
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');

//Live edit intialize.
gulp.task('browserSync', function() {
	browserSync.init({
		server: './production'//Base directory for css, jss folder and index.html
	});
});

//Copy html to destination
gulp.task('copy-html', function() {
	gulp.src('./index.html')
		.pipe(gulp.dest('./production'));
});
//copy css to destination
gulp.task('copy-css', function() {
	gulp.src('./css/styles.css')
		.pipe(gulp.dest('./production/css'));
});

//Copy js to destination and Concat and uglify javascript
gulp.task('scripts-dist', function() {
	gulp.src('js/**/*.js')
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(concat('all.js'))
		.pipe(uglify())//minification //TO DO: Handle errors
		.pipe(sourcemaps.write())
		//Use for future: sGzipping is an complete to minification (uglify) it. creates pointers to repetive code.
		.pipe(gulp.dest('./production/js'));
});

gulp.task('default', ['browserSync', 'copy-html','copy-css', 'scripts-dist'], function(){ //Made to work on gulp 4.0
	//reload browser for any html file changes.
	gulp.watch('./index.html', ['copy-html']);
	gulp.watch('./production/index.html').on('change', browserSync.reload);
	//reload browser for any js file changes.
	gulp.watch('js/**/*.js', ['scripts-dist'])
	gulp.watch('./production/js/all.js').on('change', browserSync.reload);
	//reload browser for any css file changes.
	gulp.watch('./css/styles.css', ['copy-css']);
	gulp.watch('./production/css/styles.css').on('change', browserSync.reload);

})
