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
            return new Promise((res, rej) => {
                if (! data) rej("wrong_input");
                if (! data.usr || !data.pwd) rej("wrong_input");
                if (ret.user_exists(data.usr))
                {
                    ref.deps.bcrypt.compare(data.pwd, ref.data[data.usr].meta.pwd).then((v) => { res(v) }, rej);
                } else {
                    rej("authentication whoops");
                }
            });
        },
        check_session: (name, token) => {
            return new Promise((rs, rj) => {
                if (!ref.data.hasOwnProperty(name)) rj("wrong_input");
                else if (!ref.sessions.hasOwnProperty(name)) rj("wrong_name");
                else if (token != ref.sessions[name]) rj("wrong_token");
                else {
                    rs(true);
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
