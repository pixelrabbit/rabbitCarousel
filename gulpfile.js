const { src, dest, parallel, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const data = require('gulp-data');
const twig = require('gulp-twig');
const sass = require('gulp-sass');
// postcss = require('gulp-postcss');

const path = {
    html: {
        src: ["./src/**/*.twig", '!./src/**/_*.twig'],
        watch: ["./src/**/*.twig","./src/data.json"],
        data: "./src/data.json",
        dest: "./build"
    },
    css: {
        src: ["./src/css/**/*.scss"],
        watch: ["./src/css/**/*.scss"],
        dest: "./build/css/"
    }
}

function compileHTML() {
    return src(path.html.src)
        .pipe(data(() => require(path.html.data)))
        .pipe(twig({
            extname: ".html",
        }))
        .pipe(dest(path.html.dest));
}

function compileCSS() {
    return src(path.css.src)
        .pipe(sass())
        .on('error', function (err) {
            console.log(err.message + ' on line ' + err.lineNumber + ' in file : ' + err.fileName);
        })
        .pipe(dest(path.css.dest))
        .pipe(browserSync.stream());
}

function server(cb) {
    browserSync.init({
        server: {
            baseDir: "./build",
            directory: true
        },
        open: true,
        notify: true
    })
    cb();
}


exports.default = series(server);

watch(path.html.watch).on('change', series(compileHTML, browserSync.reload));
watch(path.css.watch).on('change', series(compileCSS)); 
