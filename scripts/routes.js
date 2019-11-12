'use strict';

let page_routes = {
    "/": "index.html",
    "/login": "login.html",
    "/dashboard": "dashboard.html"
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
            }],
        "/api/googleoauthcallback": [
            (req, res) => {
                let code;
                if (/googleoauthcallback\?code=/.test(req.url)) {
                    code = req.url.substr(req.url.find("?code=")+6);
                    console.log("code from oauth callback: ", code);
                    const {tokens} = oauth2Client.getToken(code);
                    console.log(tokens);
                }
            }
        ],
        "/api/tokenauth": [noop,
            (req, res) => {
                console.log(req.body);
                res.end("kay", 200);
            }
        ]
    };

    for (let p in page_routes) {
        ret[p] = [(req, res) => { return res.sendFile(ref.path + ref.config.app.pages_location + page_routes[p]); }, noop]
    }

    return ret;
};