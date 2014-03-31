var gulp = require('gulp');
var path = require('path');
var open = require('open');
var express = require ('express');
var lr = require('tiny-lr');
var closure = require('gulp-closure-compiler');
var bytediff = require('gulp-bytediff');
var micro = require('gulp-micro');

var server = lr();
var app = express();

var APP_ROOT = __dirname + '/source';
var APP_PORT = 4000;

// Opens a browser with the application path.
gulp.task('open', ['serve'], function(){
  open('http://localhost:' + APP_PORT);
});

// Statically serves files and adds the LiveReload script.
gulp.task('serve', function () {
  app.use(require('connect-livereload')());
  app.use(express.static(APP_ROOT));
  app.listen(APP_PORT);
});

// Watches for file changes and reloads browser pages.
gulp.task('watch', function () {
  server.listen(35729, function (err) {
    if (err) {
      return console.log(err);
    }

    gulp.watch([
      'source/**/*'
    ], function (evt) {
      server.changed({
        body: {
          files: [path.relative(APP_ROOT, evt.path)]
        }
      });
    });
  });
});


// Print some stats (js1k elgibility), minify and output to "/submission/"
gulp.task('build', function() {
  return gulp.src('source/*.js')
    .pipe(bytediff.start())
    .pipe(closure({compilation_level: 'ADVANCED_OPTIMIZATIONS'}))
    .pipe(bytediff.stop())
    .pipe(gulp.dest('build/'));
});

// Default developer working task.
gulp.task('work', ['watch', 'open']);

gulp.task('default', ['work']);
