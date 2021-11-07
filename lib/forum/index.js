const BaseClass = require('../base');

const { FORUM } = require('../../config/urls.json');

class Forum extends BaseClass {
    boards(options = {}) {
        return this._formRequest('GET', `${FORUM}/boards`, options);
    }

    topics(options = {}) {
        return this._formRequest('GET', `${FORUM}/topics`, options);
    }

    details(id, options = {}) {
        const params = {
            limit: 100,
            offset: 0,
            ...options
        };

        return this._formRequest('GET', `${FORUM}/topic/${id}`, params);
    }
}

module.exports = Forum;
