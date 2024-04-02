const { src, dest, series, watch } = require(`gulp`),
    jsLinter = require(`gulp-eslint`),
    CSSLinter = require(`gulp-stylelint`),
    babel = require(`gulp-babel`),
    browserSync = require(`browser-sync`),
    htmlValidator = require(`gulp-html`),
    reload = browserSync.reload,
    htmlCompressor = require(`gulp-htmlmin`),
    jsCompressor = require(`gulp-uglify`),
    sass = require(`gulp-sass`)(require(`sass`));



let compressHTML = () => {
    return src([`index.html`])
        .pipe(htmlCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod/`));
};


let validateHTML = () => {
    return src([`index.html`])
        .pipe(htmlValidator(undefined));
};


let lintJS = () => {
    return src(` js/*.js`)
        .pipe(jsLinter(`.eslintrc`))
        .pipe(jsLinter.formatEach(`compact`));
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



let compileCSSForDev = () => {
    return src(`styles/*.css`)
        .pipe(sass.sync({
            outputStyle: `expanded`,
            precision: 10
        }).on(`error`, sass.logError))
        .pipe(dest(`temp/styles`));
};


let transpileJSForDev = () => {
    return src(`js/main.js`)
        .pipe(babel())
        .pipe(dest(`temp/scripts`));
};


let transpileJSForProd = () => {
    return src(`js/*.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`prod/js`));
};

let compileCSSForProd = () => {
    return src(`styles/*.css`)
        .pipe(sass.sync({
            outputStyle: `compressed`,
            precision: 10
        }).on(`error`, sass.logError))
        .pipe(dest(`prod/styles`));
};


let browserChoice = `default`;



async function allBrowsers () {
    browserChoice = [
        `brave browser`,
        `google chrome`,
        `microsoft edge`, // Note: In Windows, this might need to be microsoft-edge
        `firefox`,
        `opera`,
        `safari`,
        `vivaldi`
    ];
}


let serve = () => {
    browserSync({
        notify: true,
        reloadDelay: 50,
        browser: browserChoice,
        server: {
            baseDir: [
                `./`
            ]
        }
    });

    watch(`js/*.js`, series(lintJS, transpileJSForDev))
        .on(`change`, reload);

    watch(`index.html`)
        .on(`change`, reload);

    watch(`styles/*.css`,series(compileCSSForDev, lintCSS))
        .on(`change`, reload);

    watch(`assignment/img/**/*`)
        .on(`change`, reload);
};

let copyUnprocessedAssetsForProd = () => {
    return src([
        `img*/*`,
        `json*/*.json`

    ], {dot: true})
        .pipe(dest(`prod`));
};



exports.transpileJSForDev = transpileJSForDev;
exports.lintJS = lintJS;
exports.lintCSS = lintCSS;
exports.allBrowsers = series(allBrowsers, serve);
exports.validateHTML = validateHTML;
exports.compressHTML = compressHTML;
exports.transpileJSForProd = transpileJSForProd;
exports.copyUnprocessedAssetsForProd = copyUnprocessedAssetsForProd;
exports.compileCSSForProd = compileCSSForProd;

exports.serve = series(
    validateHTML,
    compileCSSForDev,
    lintJS,
    lintCSS,
    transpileJSForDev,
    serve
);

exports.build = series(
    compressHTML,
    compileCSSForProd,
    transpileJSForProd,
    copyUnprocessedAssetsForProd
);






