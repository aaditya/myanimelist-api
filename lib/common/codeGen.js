/**
 * PKCE Compliant Code Generator
 *  
 */
module.exports = () => {
    const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const numeric = "0123456789";
    const special = "-._~";

    let text = [];
    let possible = alpha + numeric + special;
    let limit = 128;

    for (let i = 0; i < limit; i++) {
        text.push(possible.charAt(Math.floor(Math.random() * possible.length)));
    }

    return text.join("");
}