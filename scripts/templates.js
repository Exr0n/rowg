'esversion: 6';
'use strict';
var ref;

class User {
    /* database interface */
    static writeData() {
        ref.deps.fs.createWriteStream(ref.path + 'storage/data.json')
            .write(JSON.stringify(i.data, (k, v) => v, 2));
    }
    /* utility */
    static _users = {};
    static get users()
    {
        return User._users;
    }
    static get_user(name) { // todo: this, paused here
        return Promise.resolve().then(() => {
            if (this.exists(name)) {
                return this._users[name];
            } else throw new Error("User doesn't exist!");
        });
    }
    /* core interface */
    static exists(name) {
        return User._users.hasOwnProperty(name);
    }
    /* instance properties */
    constructor() {}
    from_json(json) {
        this.json = json;
    }
    get data() {
        return this.json;
    }
    get public() {
        return this.json.public;
    }
    get private() {
        return this.json.private;
    }
    get meta() {
        return this.json.meta;
    }
    stringify() {
        return JSON.stringify(this.json);
    }
}

class Gaurdian {
    constructor () {}
    async authenticate (data) {
        if (!data) throw new Error("wrong_input");
        if (!data.usr || !data.pwd) throw new Error("wrong_input");
        return User.get_user(name).then(
            (user) => ref.deps.bcrypt.compare(data.pwd, user.meta.pwd)
        ).catch((e) => {throw new Error(e);});
    }
}

module.exports = (_ref) => {
    ref = _ref;
    return {
        User: User,
        Gaurdian: Gaurdian
    };
}