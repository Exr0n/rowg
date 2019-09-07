'use strict';

module.exports = (ref) => {
    var ret = {
        timestamp: () => {
            return ref.deps.moment.utc().format("YY-MM-DD_HH-mm-ss");
        },
        timehuman: () => {
            return ref.deps.moment().format("YYYY MMM DD HH:mm:ss");
        },
        log: (text) => {
            ref.logging.stream.write(text);
            console.log(text);
        }
    };

    ref.logging = {
        stream: ref.deps.fs.createWriteStream(ref.config.app.log_path + `${ret.timestamp()}.txt`, {
            flags: "a"
        })
    };

    return ret;
}
