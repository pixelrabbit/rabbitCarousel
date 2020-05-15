const { src, dest, parallel, series, watch } = require('gulp');
const fs = require('fs');
const browserSync = require('browser-sync').create();
const data = require('gulp-data');
const twig = require('gulp-twig');
const sass = require('gulp-sass');

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
    },
    js: {
        src: ["./src/js/**/*.js"],
        watch: ["./src/js/**/*.js"],
        dest: "./build/js/"
    }
}

function compileHTML() {
    return src(path.html.src)
    .pipe(data(function(file) {
        return JSON.parse(fs.readFileSync(path.html.data));
      }))
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
function moveJS() {
    return src(path.js.src)
          .pipe(dest(path.js.dest))
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


exports.default = series(compileHTML, moveJS, compileCSS, server);

watch(path.html.watch).on('change', series(compileHTML, browserSync.reload));
watch(path.js.watch).on('change', series(moveJS, browserSync.reload)); 
watch(path.css.watch).on('change', series(compileCSS)); 
