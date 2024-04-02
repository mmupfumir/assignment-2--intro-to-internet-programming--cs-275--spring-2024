const {series, watch, dest, src} = require(`gulp`),
    browserSync = require(`browser-sync`),
    jsLinter = require(`gulp-eslint`),
    CSSLinter = require(`stylelint`),
    babel = require(`gulp-babel`),
    htmlCompressor = require(`gulp-htmlmin`),
    imageCompressor = require(`gulp-image`),
    jsCompressor = require(`gulp-uglify`),
    del = require(`del`),
    cleanCss = require(`gulp-clean-css`);

let serve = () => {
    browserSync({
        notify: true,
        reloadDelay: 50,
        server: {
            baseDir: `./`
        }
    });

    watch(`js/*.js`).on(`change`, browserSync.reload);
    watch(`styles/*.css`).on(`change`, browserSync.reload);
    watch(`*.html`).on(`change`, browserSync.reload);
    watch(`js/*js`, series(lintJS,
        transpileJSForDev,lintCSS))
        .on(`change`, browserSync.reload);
};

let transpileJSForProd = () => {
    return src(`js/main.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`prod`));
};

let lintJS = () => {
    return src(`js/*.js`)
        .pipe(jsLinter(`.eslintrc`))
        .pipe(jsLinter.formatEach(`compact`));
};

let lintCSS = () => {
    return src(`sytles./*.css`)
        .pipe(CSSLinter({
            failAfterError: false,
            reporters: [
                {formatter: `string`, console: true}
            ],
            configFile: `.stylelintrc.json`
        }));
};

let transpileJSForDev = () => {
    return src(`js/*.js`)
        .pipe(babel())
        .pipe(dest(`js`));
};

let compressHTML = () => {
    return src(`*.html`)
        .pipe(htmlCompressor({collapseWhitespace:
        true}))
        .pipe(dest(`prod`));
};

let compressImages = () => {
    return src(`img/*`)
        .pipe(imageCompressor({
            optipng: [`-i 1`, `-strip all`, `-fix`, `-o7`, `-force`],
            pngquant: [`--speed=1`, `--force`, 256],
            zopflipng: [`-y`, `--lossy_8bit`, `--lossy_transparent`],
            jpegRecompress: [`--strip`, `--quality`, `medium`, `--min`, 40,
                `--max`, 80],
            mozjpeg: [`-optimize`, `-progressive`],
            gifsicle: [`--optimize`],
            svgo: [`--enable`, `cleanupIDs`, `--disable`, `convertColors`],
            quiet: false
        }))
        .pipe(dest(`prod/img`));
};

let compressCSS = () => {
    return src(`styles/*.js`)
        .pipe(cleanCss())
        .pipe(dest(`prod`));
};

let copyUnprocessedAssetsForProd = () => {
    return src([
        `*.*`,
        `**`,
        `!img/`,
        `!.git/`,
        `!README.md`
    ], {dot: true})
        .pipe(dest(`prod`));
};

async function clean() {
    let fs = require(`fs`),
        i,
        foldersToDelete = [`./temp`, `prod`];

    for (i = 0; i < foldersToDelete.length; i++) {
        try {
            fs.accessSync(foldersToDelete[i], fs.F_OK);
            process.stdout.write(`\n\tThe ` + foldersToDelete[i] +
                ` directory was found and will be deleted.\n`);
            del(foldersToDelete[i]);
        } catch (e) {
            process.stdout.write(`\n\tThe ` + foldersToDelete[i] +
                ` directory does NOT exist or is NOT accessible.\n`);
        }
    }

    process.stdout.write(`\n`);
}

exports.default = serve;
exports.lintJS = lintJS;
exports.lintCSS = lintCSS;
exports.transpileJSForDev = transpileJSForDev;
exports.compressHTML = compressHTML;
exports.compressImages = compressImages;
exports.transpileJSForProd = transpileJSForProd;
exports.compressCSS = compressCSS;
exports.copyUnprocessedAssetsForProd = copyUnprocessedAssetsForProd;
exports.clean = clean;
exports.serve = series(
    lintJS,
    serve,
    lintCSS,
    transpileJSForDev
);
exports.build = series(
    compressHTML,
    compressCSS,
    transpileJSForProd,
    copyUnprocessedAssetsForProd
);
