const BaseClass = require('../base');

const { ANIME } = require('../../config/urls.json');
const defaults = require('../../config/defaults');

class Anime extends BaseClass {
    details(id, options = {}) {
        const params = {
            fields: defaults.fields,
            ...options
        };

        return this._formRequest('GET', `${ANIME}/${id}`, params);
    }

    list(key, options = {}) {
        const params = {
            q: key,
            limit: 100,
            fields: defaults.fields,
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
            fields: defaults.fields,
            ...options
        };

        return this._formRequest('GET', `${ANIME}/season/${year}/${season}`, params);
    }

    ranking(rankingType, options = {}) {
        if (!defaults.animeRanking.includes(rankingType)) {
            throw new Error("Invalid Ranking Type")
        }
        
        const params = {
            ranking_type: rankingType,
            limit: 100,
            offset: 0,
            fields: defaults.fields,
            ...options
        }

        return this._formRequest('GET', `${ANIME}/ranking`, params);
    }

    suggestions(options = {}) {
        const params = {
            limit: 100,
            offset: 0,
            fields: defaults.fields,
            ...options
        }

        return this._formRequest('GET', `${ANIME}/suggestions`, params);
    }
}

module.exports = Anime;
