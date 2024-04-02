const {src, dest, series, watch } = require(`gulp`),
    CSSLinter = require(`gulp-stylelint`),
    cleanCSS = require(`gulp-clean-css`),
    babel = require(`gulp-babel`),
    htmlCompressor = require(`gulp-htmlmin`),
    jsCompressor = require(`gulp-uglify`),
    jsLinter = require(`gulp-eslint`),
    browserSync = require(`browser-sync`),
    reload = browserSync.reload;

let browserChoice = `vivaldi`;

let minifyCSSForProd = () => {
    return src(`styles/*.css`)
        .pipe(cleanCSS({compatibility: `ie8`}))
        .pipe(dest(`prod/styles`));
};

let lintJS = () => {
    return src(`js/*.js`)
        .pipe(jsLinter())
        .pipe(jsLinter.formatEach(`compact`));
};

let transpileJSForProd = () => {
    return src(`js/*.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`prod/js`));
};

let compressHTML = () => {
    return src(`*html`)
        .pipe(htmlCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod`));
};

let copyUnprocessedAssetsForProd = () => {
    return src([
        `*.*`,
        `**`,
        `!node_modules/`,
        `!node_modules/**`,
        `!*.html`,
        `img/`,
        `img/*.jpg`,
        `!js/*.js`,
        `!js/**/*.js`,
        `!gulpfile.js`,
        `!package-lock.json`,
        `!package.json`,
        `!README.md`,
        `!styles/`,
        `!.git/`,
        `!.git/**`,
        `!prod/`,
        `!prod/**`
    ], {dot: true})
        .pipe(dest(`prod`));
};

let serve = () => {
    browserSync({
        notify: true,
        reloadDelay: 75,
        browser: browserChoice,
        server: {
            baseDir: [
                `./`
            ]
        }
    });

    watch(`js/*.js`, series(lintJS))
        .on(`change`, reload);
};

let lintCSS = () => {
    return src(`styles/*.css`)
        .pipe(CSSLinter({
            failAfterError: false,
            reporters: [
                {formatter: `string`, console: true}
            ]
        }));
};

exports.serve = series(
    lintJS,
    lintCSS,
    // copyUnprocessedAssetsForDev,
    serve
);

exports.default = serve;

exports.build = series(
    compressHTML,
    minifyCSSForProd,
    transpileJSForProd,
    copyUnprocessedAssetsForProd
);
