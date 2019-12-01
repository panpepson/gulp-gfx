var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var imageResize = require('gulp-image-resize');
var imageminMozjpeg = require('imagemin-mozjpeg');
//var imageminGuetzli = require('imagemin-guetzli');
//var sequence = require('run-sequence');
var sequence = require('gulp-sequence')

// ======================== obrazki =======================

var obrazki = {
     imgin: '/home/00/*.{jpg,jpeg,png,gif,JPG}',
     imgout: '/home//00/1',
     imgin2: '/home/00/0/*.{jpg,jpeg,png,gif}',
     mjpgIn: '/home/00/1/*.{jpg,jpeg,png,gif,JPG}',
     mjpgOut: '/home/00/0/',
     };

gulp.task('resize', function (done) {
  gulp.src(obrazki.imgin)
    .pipe(imageResize({
       width : 800,
      //height : 100,
      //crop : true,    //przycinanie
      //quality: 46,
      progressive: true,
      interlace: true,  //przeplot
      noProfile: true,  //metadane
      cover: true,      //pilnuje-proporcji
      upscale : true    //up-skalowanie
    }))
    .pipe(gulp.dest(obrazki.imgout));
    done();
});

gulp.task('mjpg', function (done ) {
    gulp.src(obrazki.mjpgIn).pipe(imagemin([imageminMozjpeg({ quality: 46 })])).pipe(gulp.dest(obrazki.mjpgOut))
//    gulp.src(obrazki.mjpgIn).pipe(imagemin([imageminGuetzli({ quality: 46 })])).pipe(gulp.dest(obrazki.mjpgOut))

    done();
});

gulp.task('gfx', gulp.series(['resize'],'mjpg'), function() {
