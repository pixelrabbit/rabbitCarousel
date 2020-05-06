const { src, dest, parallel, series, watch } = require('gulp'),
browserSync = require('browser-sync').create(),
data = require('gulp-data'),
twig = require('gulp-twig'),
sass = require('gulp-sass'),
postcss = require('gulp-postcss');

const path = {
    html: {
        src: ["./src/**/*.twig",'!./src/**/_*.twig'],
        data: "./src/data.json",
        watch: ["./src/**/*.twig"],
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
        .pipe(data(()=>require(path.html.data)))
        .pipe(twig({
            extname: ".html",
        }))
        .pipe(dest(path.html.dest));
}

function compileCSS() {
    return src(path.css.src)
      .pipe(sass().on('error', sass.logError))
      .pipe(dest(path.css.dest));
  }

function server(cb) {
    browserSync.init({
        server: {
            baseDir: "./build",
            directory: true
        },
        open: false,
        notify: true
    })
    cb();
}


exports.default = series(server);

watch(path.html.watch).on('change', series[compileHTML, browserSync.reload]);
watch(path.css.watch).on('change', series[compileCSS, browserSync.stream]); 