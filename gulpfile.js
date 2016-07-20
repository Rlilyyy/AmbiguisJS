var gulp = require('gulp');
var babel = require('gulp-babel');
var minify = require('gulp-minify');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('default', function() {
  return gulp.src('src/ambiguis.js')
    .pipe(babel({
      presets: ['es2015'],
    }))
    .pipe(gulp.dest('dist'));
});

// gulp.task('default', function() {
//   browserify({
//     entries: ['./src/ambiguis.js', './src/index.js'],
//     debug: true
//   })
//   .transform(
//     'babelify',
//     {presets: ['es2015']}
//   )
//   .bundle()
//   .pipe(source('index.js'))
//   .pipe(buffer()) // 缓存文件内容
//   .pipe(sourcemaps.init({loadMaps: true})) // 从 browserify 文件载入 map
//   .pipe(gulp.dest('./'));
// })

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
