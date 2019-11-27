'esversion: 6';
'use strict';
var ref;

class User {
    /* database interface */
    static writeData() {
        ref.deps.fs.createWriteStream(ref.path + 'storage/data.json')
            .write(JSON.stringify(i.data, (k, v) => v, 2));
    }
    static _users = {};
    static get users()
    {
        return User._users;
    }
    /* core interface */
    static exists(name) {
        return User._users.hasOwnProperty(name);
    }
    constructor() {}
    from_json(json) {
        this.json = json;
    }
    get data() {
        return this.json;
    }
    stringify() {
        return JSON.stringify(this.json);
    }
}
module.exports = (_ref) => {
    ref = _ref;
    return {
        User: User
    };
}