const BaseClass = require('../base');

const { ANIME } = require('../../config/urls.json');
const defaults = require('../../config/defaults');

class Anime extends BaseClass {
    details(id, options = {}) {
        const params = {
            fields: defaults.fields.join(','),
            ...options
        };

        return this._formRequest('GET', `${ANIME}/${id}`, params);
    }

    list(key, options = {}) {
        const params = {
            q: key,
            limit: 100,
            fields: defaults.fields.join(','),
            ...options
        };

        return this._formRequest('GET', ANIME, params);
    }

    seasonal(season, year, options = {}) {
        if (!defaults.seasons.includes(season)) {
            throw new Error("Invalid season name");
        }

        const params = {
            limit: 100,
            fields: defaults.fields.join(','),
            ...options
        };

        return this._formRequest('GET', `${ANIME}/season/${year}/${season}`, params);
    }
}

module.exports = Anime;
