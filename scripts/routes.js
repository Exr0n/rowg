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
                req.body = JSON.parse(req.body);
                // pwd for $2b$14$3xzYQBfhdN0EPHYdM2/u7.oUISDHAMDa9RPTT48fqsuQJIdMA0cu2 is johny
                if (! ref.data.hasOwnProperty(req.body.user)) return res.end("unkown_name", 403);
                ref.deps.bcrypt.compare(req.body.token, ref.data[req.body.user].pwd)
                    .then(r => {
                        if (r) res.end("kay", 200); // todo: get data from database and return the json.stringify
                        else { res.end("wrong_pass", 403); }
                        return;
                    }).catch(e => {
                    res.end("whoops", 403);
                });
                
            }
        ]
    };

    for (let p in page_routes) {
        ret[p] = [(req, res) => { return res.sendFile(ref.path + ref.config.app.pages_location + page_routes[p]); }, noop]
    }

    return ret;
};