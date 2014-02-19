var gulp = require('gulp');
var js1k = require("gulp-js1k");

// Print some stats (js1k elgibility), minify and output to "/submission/"
gulp.task("js1k", function() {
    gulp.src("original/*.js")
        .pipe(js1k())
        .pipe(gulp.dest("submission/"));
});

// Print some stats (js1k elgibility), minify, output to "/submission/" with the shim html file
gulp.task("js1k-shim", function() {
    gulp.src("original/*.js")
        .pipe(js1k(true)) // Notice the true
        .pipe(gulp.dest("submission/"));
});
