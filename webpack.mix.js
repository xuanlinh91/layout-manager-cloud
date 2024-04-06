let mix = require("laravel-mix");

mix
    .setPublicPath("./")
    .js("src/js/popup.js", "dist/js")
    .vue()
    .copy("src/images/", "dist/images")
    .copy("src/manifest.json", "dist/manifest.json")
    .copy("src/index.html", "dist/index.html")
    .copy("src/css/popup.css", "dist/css")
    .options({
        processCssUrls: false,
    });
