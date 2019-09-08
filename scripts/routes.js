'use strict';

let page_routes = {
    "/": "login.html",
    "/login": "login.html"
}

module.exports = (ref) => {
    var ret = {
        "/api/login": (req, res) => {
            let body = "";
            req.on('body', (chunk) => {
                body += chunk;
            });
            req.on('end', () => {
                console.log(body);
            });
            res.redirect("/");
        }
    };

    for (let p in page_routes) {
        ret[p] = (req, res) => { return res.sendFile(ref.path + ref.config.app.pages_location + page_routes[p]); }
    }

    console.log(ret);

    return ret;
};