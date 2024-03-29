let mix = require("laravel-mix");

mix
    .setPublicPath("./")
    .js("src/js/popup.js", "dist/js")
    // .js("src/js/layout.js", "dist/js")
    .js("src/js/background.js", "dist/")
    .vue()
    .copy("src/images/", "dist/images")
    .copy("src/manifest.json", "dist/manifest.json")
    .copy("src/popup.html", "dist/popup.html")
    .copy("src/js/layout.js", "dist/js")
    .copy("src/css/popup.css", "dist/css")
    .options({
        processCssUrls: false,
    });
