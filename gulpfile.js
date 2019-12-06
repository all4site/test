var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    notify = require('gulp-notify'),
    wait = require('gulp-wait');

//SASS
gulp.task('sass', function () {
    return gulp.src('sass/**/*.sass')
        .pipe(wait(500))
        .pipe(sass.sync())
        .on('error', notify.onError({
            message: "<%= error.message %>",
            title: "Sass Error!"
        }))
        .pipe(autoprefixer(['last 2 versions', '> 1%', 'ie 8'], {
            cascade: true
        }))
        .pipe(gulp.dest('css/'))
});

//BROWSER SYNC
gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: './'
        },
        // proxy: 'php-lessons',
        // notify: false
    });
});

// WATCH
gulp.task('watch', function () {
    gulp.watch('**/*.php').on('change', browserSync.reload);
    gulp.watch('**/*.html').on('change', browserSync.reload);
    gulp.watch('**/*.css').on('change', browserSync.reload);
    gulp.watch('sass/*.sass', gulp.parallel('sass'));
});

//DEFAULT
gulp.task('default', gulp.parallel('browser-sync', 'watch'));


// npm i -D gulp browser-sync gulp-sass gulp-autoprefixer gulp-notify gulp-wait