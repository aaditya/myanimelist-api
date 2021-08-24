const axios = require('axios');
const qs = require('querystring');

const urls = require('./config/urls.json');
const defaults = require('./config/defaults');

const generatePKCECode = require('./lib/codeGen');

class MalAPI {
    constructor(options) {
        options = options || {};

        if (options.clientId) {
            this.clientId = options.clientId;
        }

        if (options.clientSecret) {
            this.clientSecret = options.clientSecret;
        }

        if (options.accessToken) {
            this.setAuthInterceptor(options.accessToken);
        }

        if (options.refreshToken) {
            this.refreshToken = options.refreshToken;
        }
    }

    setAuthInterceptor(accessToken) {
        axios.interceptors.request.use(function (config) {
            config.headers.Authorization = `Bearer ${accessToken}`;
            return config;
        });
    }

    formRequest(method, endpoint, params = {}, body = {}, options = {}) {
        return axios({
            method,
            url: urls.ANIME + endpoint,
            params,
            data: qs.stringify(body),
            ...options,
        });
    }

    generateAuthorizationUrl() {
        const challengeCode = generatePKCECode();
        return {
            challengeCode,
            url: (
                urls.AUTH
                + '/authorize?response_type=code'
                + '&client_id=' + this.clientId
                + '&code_challenge=' + challengeCode)
        };
    }

    generateRefreshToken(responseCode, challengeCode) {
        return this.formRequest('POST', '', {}, {
            "client_id": this.clientId,
            "client_secret": this.clientSecret,
            "grant_type": "authorization_code",
            "code": responseCode,
            "code_verifier": challengeCode
        }, {
            url: urls.AUTH + '/token'
        });
    }

    refreshAccessToken(refreshToken) {
        return this.formRequest('POST', '', {}, {
            "client_id": this.clientId,
            "client_secret": this.clientSecret,
            "grant_type": "refresh_token",
            "refresh_token": refreshToken
        }, {
            url: urls.AUTH + '/token'
        });
    }

    findAnime(id, options = {}) {
        const params = {
            fields: defaults.fields.join(','),
            ...options
        };

        return this.formRequest('GET', `/${id}`, params);
    }

    search(key, options = {}) {
        const params = {
            q: key,
            limit: 100,
            fields: defaults.fields.join(','),
            ...options
        };

        return this.formRequest('GET', '', params);
    }

    findSeason(season, year, options = {}) {
        if (!defaults.seasons.includes(season)) {
            throw new Error("Invalid season name");
        }

        const params = {
            limit: 100,
            fields: defaults.fields.join(','),
            ...options
        };

        return this.formRequest('GET', `/season/${year}/${season}`, params);
    }
}

module.exports = MalAPI;
