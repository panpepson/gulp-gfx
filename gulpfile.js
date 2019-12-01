var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var imageResize = require('gulp-image-resize');
var imageminMozjpeg = require('imagemin-mozjpeg');
//var imageminGuetzli = require('imagemin-guetzli');
//var sequence = require('run-sequence');
var sequence = require('gulp-sequence')
// ======================== obrazki =======================

var obrazki = {
     imgin: '/home/olo/Pulpit/LWL/00/*.{jpg,jpeg,png,gif,JPG}',
     imgout: '/home/olo/Pulpit/LWL/00/1',
     imgin2: '/home/olo/Pulpit/LWL/00/0/*.{jpg,jpeg,png,gif}',
     mjpgIn: '/home/olo/Pulpit/LWL/00/1/*.{jpg,jpeg,png,gif,JPG}',
     mjpgOut: '/home/olo/Pulpit/LWL/00/0/',
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

//    gulp.task('gfx',['resize'], function() {
    // nic nie dzila :(
          //gulp.series(['resize']);
//	  gulp.watch('/home/olo/Pulpit/LWL/00/*.{jpg,jpeg,png,gif,JPG}','resize');
//	  gulp.watch('/home/olo/Pulpit/LWL/00/0/*.{jpg,jpeg,png,gif,JPG}','mjpg');

//	 gulp.watch('resize').gulp.start('mjpg');
//	  done();
        });

/*
gulp.task('gfx', sequence(['resize'],'mjpg'))
gulp.task('mozjpeg', () =>
    gulp.src('src/*.jpg')
    .pipe(imagemin([imageminMozjpeg({
        quality: 85
    })]))
    .pipe(gulp.dest('dist'))
);

gulp.task('img', function() {
  return gulp.src(obrazki.imgin)
    .pipe(changed(obrazki.imgin))
    .pipe(imagemin())
    .pipe(gulp.dest(obrazki.imgin));
});
*/



