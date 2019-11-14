const lowerCase = require('lower-case');

let str = {};

str.sanitize = function(string) {
    str = lowerCase(string);
    str = str.replace(/[^a-z0-9._-]/gim, '');
    return str.trim();
};

module.exports = str;
