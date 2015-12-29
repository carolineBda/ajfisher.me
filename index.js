var fs = require('fs');

var Handlebars  = require('handlebars');
var Metalsmith  = require('metalsmith');
var collections = require('metalsmith-collections');
var layouts     = require('metalsmith-layouts');
var markdown    = require('metalsmith-markdown');
var permalinks  = require('metalsmith-permalinks');
var serve       = require('metalsmith-serve');
var watch       = require('metalsmith-watch');
var wordcount   = require('metalsmith-word-count');

Handlebars.registerPartial('footer', fs.readFileSync(__dirname + '/layouts/partials/footer.hbt').toString());
Handlebars.registerPartial('head', fs.readFileSync(__dirname + '/layouts/partials/head.hbt').toString());
Handlebars.registerPartial('header', fs.readFileSync(__dirname + '/layouts/partials/header.hbt').toString());
Handlebars.registerPartial('nav', fs.readFileSync(__dirname + '/layouts/partials/nav.hbt').toString());
Handlebars.registerPartial('warning', fs.readFileSync(__dirname + '/layouts/partials/warning.hbt').toString());

var debug = function(options) {
    return (function(files, metalsmith, done) {
        console.log(files);
        console.log(metalsmith.metadata());
        done();
    });
};


Metalsmith(__dirname)
    .use(watch({
        paths: {
            "$(source)/**/*": true,
            "layouts/**/*": "**/*.md",
            "index.js": "**/*.md",
        }
    }))
    .use(collections({
        pages: {
            pattern: "content/pages/*.md",
        },
        posts: {
            pattern: "content/posts/*.md",
            sortBy: "date",
            reverse: true,
        },
    }))
    .use(markdown())
    .use(wordcount({
        metaKeyCount: "wordcount",
        metaKeyReadingTime: "readingtime",
        seconds: false,
        raw: true,
    }))
    .use(permalinks({
        pattern: ":slug",
        linksets: [{
            match: {collection: "posts"},
            pattern: ":date/:slug",
        },
        {
            match: { collection: "pages"},
            pattern: ":slug",
        }],
    }))
    .use(layouts({
        engine: "handlebars",
        directory: "./layouts",
        partials: "./layouts/partials",
    }))
    .source("./src")
    .destination("./build")
    .use(serve({
        cache: 0,
        verbose: true,
    }))
    .build(function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Site built correctly");
        }
    });
