//all three tracts you first transpile then compress!!!
//linting in dev but will not need to in prod as it will already be linted
//compressing in prod but will not need to in dev
//before submitting complie and if it works
////move the folder somehwere else and then comple again to make sure you do not have any absulote paths

const { src, dest, series, watch } = require(`gulp`),
    CSSLinter = require(`gulp-stylelint`), //need (install stylelint via npm i -D style)
    babel = require(`gulp-babel`), //need will transpile code from es6 -> es5
    htmlCompressor = require(`gulp-htmlmin`), //need
    cleanCSS = require(`gulp-clean-css`), //need
    jsCompressor = require(`gulp-uglify`),
    jsLinter = require(`gulp-eslint`),
    browserSync = require(`browser-sync`),
    reload = browserSync.reload;

let browserChoice = `default`;

///NEEDED FOR DEV
let lintJS = () => {
    return src(`js/*.js`)
        .pipe(jsLinter(`.eslintrc`))
        .pipe(jsLinter.formatEach(`compact`));
};

let lintCSS = () => {
    return src(`styles/main.css`)
        .pipe(CSSLinter({
            failAfterError: false,
            reporters: [
                {formatter: `string`, console: true}
            ]
        }));
};

let transpileJSForDev = () => {
    return src(`js/*.js`)
        .pipe(babel())
        .pipe(dest(`temp/js`));
};

let compileCSSForDev = (`minify-css`, () => {
    return src(`styles/*.css`)
        .pipe(cleanCSS())
        .pipe(dest(`temp/styles`));
});

let copyUnprocessedAssetsForDev = () => {
    return src([
        `img*/*`,       // Source all images,
        `json*/*.json`, // and all json,
        `index.html`    // index.html
    ], {dot: true})
        .pipe(dest(`temp`));
};

///NEEDED FOR PROD
let transpileJSForProd = () => {
    return src(`js/*.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`prod/js`));
};

let compressHTML = () => {
    return src([`index.html`])
        .pipe(htmlCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod`));
};

let compileCSSForProd = (`minify-css`, () => {
    return src(`styles/*.css`)
        .pipe(cleanCSS())
        .pipe(dest(`prod/styles`));
});

let copyUnprocessedAssetsForProd = () => {
    return src([
        `img*/*`,       // Source all images,
        `json*/*.json`, // and all json,
    ], {dot: true})
        .pipe(dest(`prod`));
};


//server is made up of the temp folder, dev folder, and HTML inside the dev folder (line 84-87)
let serve = () => {
    browserSync({
        notify: true,
        reloadDelay: 50,
        browser: browserChoice,
        server: {
            baseDir: [
                `temp`,
            ]
        }
    });
    watch(`index.html`)
        .on(`change`, reload);

    watch(`js/*.js`, series(lintJS, transpileJSForDev))
        .on(`change`, reload);

    watch(`styles/main.css`, series(lintCSS, compileCSSForDev))
        .on(`change`, reload);

};


exports.compressHTML = compressHTML;
exports.lintJS = lintJS;
exports.lintCSS = lintCSS;
exports.transpileJSForDev = transpileJSForDev;
exports.compileCSSForDev = compileCSSForDev;
exports.copyUnprocessedAssetsForDev = copyUnprocessedAssetsForDev;
exports.transpileJSForProd = transpileJSForProd;
exports.compileCSSForProd = compileCSSForProd;
exports.copyUnprocessedAssetsForProd = copyUnprocessedAssetsForProd;
exports.serve = series(
    copyUnprocessedAssetsForDev,
    lintJS,
    lintCSS,
    compileCSSForDev,
    transpileJSForDev,
    serve
);

exports.build = series(
    compressHTML,
    transpileJSForProd,
    compileCSSForProd,
    copyUnprocessedAssetsForProd
);
