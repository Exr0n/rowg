module.exports = (ref) => {
    
    return {
        logger: (req, res) => {
            let text = `
${ref.util.timestamp()}:
    ${req.method} ${req.protocol}:/\/${req.headers.host}${req.url}
    from ${req.ip}
`;
            ref.util.log(text);
            req.next();
        },
	    require_secure: (req, res) => {
            if (ref.app.servers.https && ! req.secure) res.redirect(301, 'https://' + req.headers.host + req.url);
            else req.next();
        },
        static: ref.deps.express.static("static"),
        body_parser: (req, res) => {
            if (req.method == "POST")
            {
                let body = '';
                req.on('data', (chunk) => body += chunk.toString());
                req.on('end', () => {req.body = body; req.next();});
            } else {req.next();}
        }
    };
};
