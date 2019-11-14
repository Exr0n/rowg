'esversion: 6';
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
        },
        user_exists: name => ref.data.hasOwnProperty(name),
        authenticate: (data) => {
            console.log("utility.js->aunthenticate:\n" + JSON.stringify(data, (k, v) => v, 2));
            return new Promise((res, rej) => {
                if (! data) rej("wrong_input");
                if (! data.usr || !data.pwd) rej("wrong_input");
                if (ret.user_exists(data.usr))
                {
                    console.log("user exists!");
                    ref.deps.bcrypt.compare(data.pwd, ref.data[data.usr].meta.pwd).then((v) => { console.log("yay!: " + v); res(v) }, rej);
                } else {
                    rej("authentication whoops");
                }
            });
        }
    };

    ref.logging = {
        stream: ref.deps.fs.createWriteStream(ref.config.app.log_path + `${ret.timestamp()}.txt`, {
            flags: "a"
        })
    };

    return ret;
}
