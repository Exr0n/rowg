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
		if (! req.secure) res.redirect(301, 'https://' + req.headers.host + req.url);
		else req.next();
	}
    }
}
