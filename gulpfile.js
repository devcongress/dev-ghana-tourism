var 
	gulp = require('gulp');
	browserSync = require('browser-sync').create();

/**
 * Require Dependencies
 */
var 
    gulp = require("gulp"),
    sass = require("gulp-sass"),
    newer = require("gulp-newer"),
    jshint = require("gulp-jshint"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    imagemin = require("gulp-imagemin"),
    htmlInclude = require("gulp-file-include"),
    stylish = require("jshint-stylish");

/**
 * Input and Output folders   
 */    
var io = {
    src: "assets/",
    dest: "build/"
};

/**
 * CSS folders   
 */    
var css = {
    src : io.src+"css/*.scss",
    out: io.dest+"css/",
    watch: io.src+"css/**/*"    
};

/**
 * JS folders   
 */    
var js = {
    src : io.src+"js/**/*",
    out: io.dest+"js/",
    watch: io.src+"js/**/*"
};

/**
 * HTML Files
 */
var html = {
	src : io.src + "html/*.html",
	out: "./",
	watch : [ io.src + "html/**/*" , io.src + "includes/**/*" ]
};

/**
 * Images
 */
var images = {

  src : io.src + "images/**/*",
  out : io.dest + "images/",
  watch : io.src + "images/**/*"

}

/**
 * Css Task
 */
gulp.task("sass",function(){
   return gulp.src(css.src)
          .pipe(sass({outputStyle:"compressed"}))
          .pipe(gulp.dest(css.out))
          .pipe(browserSync.stream()); 
});

/**
 * JS Task
 */
gulp.task("js",function(){
   return gulp.src(js.src)
          .pipe(jshint())
          .pipe(jshint.reporter(stylish))
          .pipe(concat('app.js'))
          .pipe(uglify())
          .pipe(gulp.dest(js.out)); 
});

/** 
 * Concat HTML
 */
gulp.task("html",function(){
	return gulp.src(html.src)
		   .pipe(htmlInclude())
		   .pipe(gulp.dest('./'));
});

/**
 * minify images
 */
gulp.task("imagemin",function(){
  return gulp.src(images.src)
      .pipe(newer(images.out))
      .pipe(imagemin())
      .pipe(gulp.dest(images.out));
});

/**
 * Gulp default task
 */
gulp.task('default',['sass','js','html','imagemin'],function(){});

/** Gulp watch task */
gulp.task("watch",['sass','js','html','imagemin'],function(){

    //Watch the js folder
    gulp.watch(js.watch,['js']).on('change', browserSync.reload);;
    
    //Watch the css folder
    gulp.watch(css.watch,['sass']);

    //Watch the html folder
    gulp.watch(html.watch,['html']).on('change', browserSync.reload);;

    gulp.run('serve');

});

/** Serve files */
gulp.task('serve', function() {
    browserSync.init({
        server: {
         baseDir : "./"
        }
    });
});