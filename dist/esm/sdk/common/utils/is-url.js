import validator from 'validator';
/**
 * @ignore
 */
export function isUrl(url) {
    return validator.isURL(url, {
        protocols: ['http', 'https'],
        require_tld: false,
        require_host: true,
        require_protocol: true,
    });
}
//# sourceMappingURL=is-url.js.map