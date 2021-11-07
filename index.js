const Base = require('./lib/base');

const configurations = {
    auth: "auth",
    anime: "anime",
    forum: "forum",
    manga: "manga",
    user: "user"
}

Object.keys(configurations).forEach(prop => {
    Object.defineProperty(Base.prototype, prop, {
        configurable: true,
        get: function get() {
            const resource = require(`./lib/${configurations[prop]}`);

            return Object.defineProperty(this, prop, {
                value: new resource(this)
            })[prop];
        },
        set: function set(value) {
            Object.defineProperty(this, prop, { value })[prop];
        }
    });
});

module.exports = Base;
