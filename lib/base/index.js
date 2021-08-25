const _axios = require('axios');
const _qs = require('querystring');

class Base {
    constructor(options) {
        options = options || {};

        if (!options.accessToken && !options.clientId) {
            throw new Error("Invalid Client ID");
        }

        if (options.clientId && !options.clientSecret) {
            throw new Error("Invalid Client Secret");
        }

        if (options.accessToken) {
            this._setAuthInterceptor(options.accessToken);
        }
        
        this._setDefaults(options);

    }

    _setDefaults(opt) {
        this.clientId = opt.clientId;
        this.clientSecret = opt.clientSecret;
        this.accessToken = opt.accessToken;
        this.refreshToken = opt.refreshToken;
        this.timeout = opt.timeout;
        this.axiosConfig = opt.axiosConfig || {};
    }

    _setAuthInterceptor(accessToken) {
        _axios.interceptors.request.use(function (config) {
            config.headers.Authorization = `Bearer ${accessToken}`;
            return config;
        });
    }

    _formRequest(method, url, params = {}, body = {}) {
        const options = {
            method,
            url,
            params,
            timeout: this.timeout,
            data: _qs.stringify(body),
        };

        return _axios({ ...options, ...this.axiosConfig })
    }
}

module.exports = Base;
