'use strict';

module.exports = (ref) => {
    return {
        "/": (req, res) => {
            return res.sendFile(ref.config.pages_location + "index.html");
        }
    };
};