const BaseClass = require('../base');

const { ANIME, MANGA, USERS } = require('../../config/urls.json');

class Users extends BaseClass {
    details(username = "@me", options = {}) {
        if (username != "@me") {
            throw new Error("Other user info is currently unsupported by MAL.")
        }
        
        return this._formRequest('GET', `${USERS}/${username}`, options);
    }

    listAnime(username = "@me", options = {}) {
        return this._formRequest('GET', `${USERS}/${username}/animelist`, options);
    }

    updateAnime(id, body) {
        return this._formRequest('PATCH', `${ANIME}/${id}/my_list_status`, {}, body);
    }

    deleteAnime(id) {
        return this._formRequest('DELETE', `${ANIME}/${id}/my_list_status`, {});
    }

    listManga(username = "@me", options = {}) {
        return this._formRequest('GET', `${USERS}/${username}/mangalist`, options);
    }

    updateManga(id, body) {
        return this._formRequest('PATCH', `${MANGA}/${id}/my_list_status`, {}, body);
    }

    deleteManga(id) {
        return this._formRequest('DELETE', `${MANGA}/${id}/my_list_status`, {});
    }
}

module.exports = Users;
