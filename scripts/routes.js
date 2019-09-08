'use strict';

let page_routes = {
    "/": "index.html",
    "/login": "login.html"
}

module.exports = (ref) => {
    var noop = (req, res) => req.next();

    var ret = {
        "/api/login": [noop,
            (req, res) => {
                let body = "";
                req.on('data', (chunk) => {
                    body += chunk;
                });
                req.on('end', () => {
                    try {
                        body = JSON.parse(body);
                        i.util.login(body);
                        res.end(200);
                    } catch (e) {
                        res.end(1001);
                    }
                });
            }]
    };

    for (let p in page_routes) {
        ret[p] = [(req, res) => { return res.sendFile(ref.path + ref.config.app.pages_location + page_routes[p]); }, noop]
    }

    console.log(ret);

    return ret;
};