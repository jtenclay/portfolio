var gulp = require("gulp");
var less = require("gulp-less");
var watch = require("gulp-watch");

gulp.task("watch", function() {
	gulp.watch(["./styles/*.less"], ["compile-less"])
});

gulp.task("compile-less", function(){
	gulp.src("./styles/*.less")
	.pipe(less())
	.pipe(gulp.dest("./styles"));
});

gulp.task("default", ["compile-less","watch"]);