/*jslint node: true */
'esversion: 6';
'use strict';

/* setup */
var i = {
    deps: {
        express: require('express'),
        fs: require('fs'),
        moment: require('moment'),
        http: require('http'),
        https: require('https'),
        bcrypt: require('bcrypt'),
        uuid: require('uuid/v4')
    },
    config: require('./config.json'),
    path: __dirname + "/",
    secrets: require("./secrets.json"),
    data: require("./storage/data.json"),
    sessions: {"dev": "testtoken"} // todo: remove the test token entry
};
i.util = require(i.config.app.scripts_location + "utility.js")(i);
i.app = i.deps.express();

/* middlewares */
var mws = require(i.config.app.scripts_location + 'middlewares.js')(i);
for (let mw in mws) {
    i.app.use(mws[mw]);
}

/* routing */
var routes = require(i.config.app.scripts_location + 'routes.js')(i);
for (var r in routes) {
    i.app.get( r, routes[r][0] || ((req, res) => {req.next()}));
    i.app.post(r, routes[r][1] || ((req, res) => {req.next()}));
}

i.app.use((req, res) => {res.sendFile(i.path + i.config.app.pages_location + "not_found.html")});

/* listen */
i.app.servers = {
    http: i.deps.http.createServer(i.app)
};

try {
    let ssl_creds = {
        key: i.deps.fs.readFileSync('/etc/letsencrypt/live/www.exr0n.com/privkey.pem', 'utf8'),
        cert: i.deps.fs.readFileSync('/etc/letsencrypt/live/www.exr0n.com/cert.pem', 'utf8'),
        ca: i.deps.fs.readFileSync('/etc/letsencrypt/live/www.exr0n.com/chain.pem', 'utf8')
    };
    i.app.servers.https = i.deps.https.createServer(ssl_creds, i.app);
} catch (e) {
    console.error(e);
}

for (let key in i.app.servers)
{
	i.app.servers[key].listen(i.secrets.ports[key], () => { console.log(`Listening on port ${i.secrets.ports[key]}`); });
}

let dataWriteInterval = setInterval(() => {
    fs.createWriteStream('./storage/data.json').write(JSON.stringify(i.data, (k, v)=>v, 2));
}, i.config.app.save_interval*1000*60) // save_interval minutes