/*jslint node: true */
'esversion: 6';
'use strict';

var i = {
    deps: {
        express: require('express'),
        fs: require('fs'),
        moment: require('moment'),
	http: require('http'),
	https: require('https')
    },
    config: require('./config.json'),
    path: __dirname + "/",
    secrets: require("./secrets.json")
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


i.ssl_creds = {
	key: i.deps.fs.readFileSync('/etc/letsencrypt/live/www.exr0n.com/privkey.pem', 'utf8'),
	cert: i.deps.fs.readFileSync('/etc/letsencrypt/live/www.exr0n.com/cert.pem', 'utf8'),
	ca: i.deps.fs.readFileSync('/etc/letsencrypt/live/www.exr0n.com/chain.pem', 'utf8')
}
i.deps.servers = {
	http: i.deps.http.createServer(i.app),
	https: i.deps.https.createServer(i.ssl_creds, i.app)
}
for (let key in i.deps.servers)
{
	i.deps.servers[key].listen(i.secrets.ports[key], () => { console.log(`Listening on port ${i.secrets.ports[key]}`); });
}
