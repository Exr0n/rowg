/*jslint node: true */
'esversion: 6';
'use strict';

var i = {
    deps: {
        express: require('express'),
        fs: require('fs'),
        moment: require('moment')
    },
    config: require('./config.json'),
    path: __dirname + "/"
};
i.util = require(i.config.app.scripts_location + "utility.js")(i);
i.app = i.deps.express();

var mws = require(i.config.app.scripts_location + 'middlewares.js')(i);
for (let mw in mws) {
    i.app.use(mws[mw]);
}

var routes = require(i.config.app.scripts_location + 'routes.js')(i);
for (var r in routes) {
    i.app.use(r, routes[r]);
}

i.app.listen(require('./secrets.json').port, () => { console.log(`Listening!`); } );