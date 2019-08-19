
const gulp = require("gulp");
const sass = require("gulp-sass");
const maps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();
const concat = require("gulp-concat");

function style() {
    return gulp.src(["./scss/**/*.scss"])
        .pipe(maps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(maps.write("./"))
        .pipe(gulp.dest("./css"))
        .pipe(browserSync.stream());
}

function concatScripts() {
    return gulp.src("./js/*.js")
        .pipe(maps.init())
        .pipe(concat("all.js"))
        .pipe(maps.write("./"))
        .pipe(gulp.dest("./dist/"));
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch(["./scss/**/*.scss"], style);
    gulp.watch("./*.html").on("change", browserSync.reload);
    gulp.watch("./js/**/*.js").on("change", function () {
        concatScripts();
        browserSync.reload()
    });
}

exports.style = style;
exports.watch = watch;
exports.concatScripts = concatScripts;