const BaseClass = require('../base');

const generatePKCECode = require('../common/codeGen');

const { AUTH } = require('../../config/urls.json');

class Auth extends BaseClass {
    getChallenge() {
        const challengeCode = generatePKCECode();
        
        return {
            challengeCode,
            url: (
                AUTH
                + '/authorize?response_type=code'
                + '&client_id=' + this.clientId
                + '&code_challenge=' + challengeCode
            )
        };
    }

    getRefreshToken(responseCode, challengeCode) {
        const body = {
            "client_id": this.clientId,
            "client_secret": this.clientSecret,
            "grant_type": "authorization_code",
            "code": responseCode,
            "code_verifier": challengeCode
        };

        return this._formRequest('POST', `${AUTH}/token`, {}, body);
    }

    refreshAccessToken(refreshToken) {
        const body = {
            "client_id": this.clientId,
            "client_secret": this.clientSecret,
            "grant_type": "refresh_token",
            "refresh_token": refreshToken
        };
        
        return this._formRequest('POST', `${AUTH}/token`, {}, body);
    }
}

module.exports = Auth;
