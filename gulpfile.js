var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var sass = require('gulp-sass');
var concat = require('gulp-concat')
var rename = require('gulp-rename');




gulp.task('default', function() {
  // place code for your default task here
});

gulp.task("sass", function(){
	return gulp.src(['./css/main.scss'])
	.pipe(sass())
	.pipe(rename("styles.min.css"))
	.pipe(cleanCSS())
	.pipe(gulp.dest("./css"))
});