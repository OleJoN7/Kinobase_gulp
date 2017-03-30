var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    cssnano = require('gulp-cssnano'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    htmlmin = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin'),
    clean = require('gulp-clean');
    several_tasks = require('run-sequence')

var config = {
    'src': './src',
    'dest': './dist',
    'html': {
        'src': './src/*.html',
        'dest': './dist/'
    },

    'sass': {
        'dest': './dist/styles/css',
        'src': './src/styles/sass/**/*.scss'
    },

    'css': {
        'src': [
            './src/styles/css/lib/*.css',
            './src/styles/css/*.css',
        ],
        'dest': './dist/styles/css',
    },

    'js': {
        'src': [
            './node_modules/jquery/dist/jquery.min.js',
            './node_modules/tether/dist/js/tether.min.js',
            './node_modules/bootstrap/dist/js/bootstrap.min.js',
            './src/js/*.js'
        ],
        'dest': './dist/js'
    },

    'img': {
        'dest': './dist/images/',
        'src': './src/images/*'
    },

    'font': {
        'dest':'./dist/styles/fonts',
        'src':'./src/styles/fonts/*/*'
    }
};

gulp.task('sass', function () {
    return gulp.src(config.sass.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: '> 5%'
        }))
        .pipe(gulp.dest(config.sass.dest))
        .pipe(gulp.dest('./src/styles/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: 'src'
        }
    });
});

gulp.task('watch', ['browserSync', 'sass'], function () {
    gulp.watch(config.sass.src, ['sass']);
    gulp.watch(config.html.src, browserSync.reload);
    gulp.watch(config.js.src, browserSync.reload);
});


gulp.task('minify:html', function() {
    return gulp.src(config.html.src)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(config.html.dest));
});


gulp.task('minify:img', function () {
        return gulp.src(config.img.src)
            .pipe(imagemin())
            .pipe(gulp.dest(config.img.dest));
    }
);

gulp.task('minify:js', function () {
    return gulp.src(config.js.src)
        .pipe(concat('app.min.js'))
        .pipe(uglify().on('error', function (e) {
            console.log(e);
        }))
        .pipe(gulp.dest(config.js.dest));
});

gulp.task('minify:css', function () {
    return gulp.src(config.css.src)
        .pipe(cssnano())
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest(config.css.dest));
});

gulp.task('font', function () {
    return gulp.src(config.font.src)
        .pipe(gulp.dest(config.font.dest));
});

gulp.task('clean', function () {
    return gulp.src(config.dest, {read: false})
        .pipe(clean());
});

gulp.task('build', function () {
    several_tasks(['clean'],
        ['minify:html', 'minify:img','minify:js', 'minify:css','font']
    )
});
