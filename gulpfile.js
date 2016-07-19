var gulp = require('gulp');
var babel = require('gulp-babel');
var minify = require('gulp-minify');
var uglify = require('gulp-uglify');
var pump = require('pump');
var rename = require('gulp-rename');

gulp.task('default', function() {
  return gulp.src('src/ambiguis.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('compress', function () {
  return gulp.src('dist/ambiguis.js')
    .pipe(rename('ambiguis.min.js'))
    .pipe(uglify({
      mangle: {except: ['ele']}
    }))
    .pipe(minify({
      ext: {
        min: '.js'
      }
    }))
    .pipe(gulp.dest('dist'));
});
