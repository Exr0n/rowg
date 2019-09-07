'use strict';

module.exports = (ref) => {
    return {
        "/": (req, res) => {
            return res.sendFile(ref.path + ref.config.app.pages_location + "index.html");
        }
    };
};