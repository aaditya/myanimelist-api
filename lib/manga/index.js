const BaseClass = require('../base');

const { MANGA } = require('../../config/urls.json');
const defaults = require('../../config/defaults');

class Manga extends BaseClass {
    details(id, options = {}) {
        return this._formRequest('GET', `${MANGA}/${id}`, options);
    }

    list(key, options = {}) {
        const params = {
            q: key,
            limit: 100,
            offset: 0,
            ...options
        };

        return this._formRequest('GET', MANGA, params);
    }

    ranking(rankingType, options = {}) {
        if (!defaults.mangaRanking.includes(rankingType)) {
            throw new Error("Invalid Ranking Type")
        }
        
        const params = {
            ranking_type: rankingType,
            limit: 100,
            offset: 0,
            ...options
        }

        return this._formRequest('GET', `${MANGA}/ranking`, params);
    }
}

module.exports = Manga;
