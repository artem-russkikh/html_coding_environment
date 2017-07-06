'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    sass = require("gulp-sass"),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    del = require('del'),
    browserSync = require("browser-sync"),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    gulpSequence = require('gulp-sequence'),
    reload = browserSync.reload;

var path = {
  build: {
    html: 'build/',
    js: 'build/js/',
    css: 'build/css/',
    img: 'build/img/',
    fonts: 'build/fonts/',
    favicon: 'build/'
  },
  src: {
    html: ['src/*.html'],
    js: 'src/js/main.js',
    css: 'src/css/main.scss',
    img: 'src/img/**/*',
    fonts: 'src/fonts/**/*',
    favicon: 'src/favicon.ico'
  },
  watch: {
    html: ['src/*.html', 'src/templates/**/*.html'],
    js: 'src/js/**/*.js',
    css: 'src/css/**/*',
    img: 'src/img/**/*',
    fonts: 'src/fonts/**/*',
    favicon: 'src/favicon.ico'
  },
  clean: './build'
};

var config = {
  server: {
    baseDir: "./build"
  },
  tunnel: false,
  host: 'localhost',
  port: 9000,
  ui: {
      port: 3001,
      weinre: {
          port: 8080
      }
  },
  open: false
};

gulp.task('html:build', function() {
  return gulp.src(path.src.html)
             .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
             .pipe(rigger())
             .pipe(gulp.dest(path.build.html))
             .pipe(reload({stream: true}));
});

gulp.task('js:build', function() {
  return gulp.src(path.src.js)
             .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
             .pipe(rigger())
             .pipe(sourcemaps.init())
             .pipe(uglify())
             .pipe(concat('main.js'))
             .pipe(sourcemaps.write())
             .pipe(gulp.dest(path.build.js))
             .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
  return gulp.src(path.src.css)
             .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
             .pipe(sourcemaps.init())
             .pipe(sass())
             .pipe(prefixer())
             .pipe(cleanCSS())
             .pipe(sourcemaps.write())
             .pipe(gulp.dest(path.build.css))
             .pipe(reload({stream: true}));
});

gulp.task('js-dev:build', function() {
  return gulp.src(path.src.js)
             .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
             .pipe(rigger())
             .pipe(sourcemaps.init())
             // .pipe(uglify())
             .pipe(concat('main.js'))
             .pipe(sourcemaps.write())
             .pipe(gulp.dest(path.build.js))
             .pipe(reload({stream: true}));
});

gulp.task('style-dev:build', function () {
  return gulp.src(path.src.css)
             .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
             .pipe(sourcemaps.init())
             .pipe(sass())
             .pipe(prefixer())
             // .pipe(cleanCSS())
             .pipe(sourcemaps.write())
             .pipe(gulp.dest(path.build.css))
             .pipe(reload({stream: true}));
});


gulp.task('image:build', function () {
  return gulp.src(path.src.img)
             .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
             .pipe(imagemin({
               progressive: true,
               svgoPlugins: [{removeViewBox: false}],
               use: [pngquant()],
               interlaced: true
             }))
             .pipe(gulp.dest(path.build.img))
             .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
  return gulp.src(path.src.fonts)
             .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
             .pipe(gulp.dest(path.build.fonts))
             .pipe(reload({stream: true}));
});

gulp.task('favicon:build', function() {
  return gulp.src(path.src.favicon)
             .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
             .pipe(gulp.dest(path.build.favicon))
             .pipe(reload({stream: true}));
});

gulp.task('watch', function(){
  watch(path.watch.html, function(event, cb) {
    gulp.start('html:build');
  });
  watch([path.watch.css], function(event, cb) {
    gulp.start('style:build');
  });
  watch([path.watch.js], function(event, cb) {
    gulp.start('js:build');
  });
  watch([path.watch.img], function(event, cb) {
    gulp.start('image:build');
  });
  watch([path.watch.fonts], function(event, cb) {
    gulp.start('fonts:build');
  });
  watch([path.watch.favicon], function(event, cb) {
    gulp.start('favicon:build');
  })
});

gulp.task('build',
  gulpSequence(
    'clean',
    [
      'html:build',
      'js:build',
      'style:build',
      'fonts:build',
      'image:build',
      'favicon:build'
    ]
  )
);

gulp.task('build-dev', [
  'html:build',
  'js-dev:build',
  'style-dev:build',
  'fonts:build',
  'image:build',
  'favicon:build'
]);

gulp.task('webserver', function () {
  return browserSync(config);
});

gulp.task('clean', function (cb) {
  return del(path.clean).then(paths => {
      console.log('Deleted files and folders:\n', paths.join('\n'));
  });
});

gulp.task('default', gulpSequence('clean', ['build-dev', 'webserver', 'watch']));
