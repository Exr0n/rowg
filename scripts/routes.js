'use strict';

module.exports = (ref) => {
    return {
        "/": (req, res) => {
            return res.end("OK", 200);
        }
    };
};