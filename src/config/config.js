import path from 'path';
/*
const dotenv = require('dotenv');
const result = dotenv.config();
if (result.error) {
    throw result.error;
}
*/
const cfg = {};

cfg.HOST = typeof process.env.HOST != 'undefined' ? process.env.HOST: '0.0.0.0';
cfg.PORT = typeof process.env.PORT != 'undefined' ? process.env.PORT: 3000;
cfg.NODE_ENV = typeof process.env.NODE_ENV != 'undefined' ? process.env.NODE_ENV: 'production';

if (typeof process.env.API_KEY == 'undefined') {
    throw('Missing API_KEY in configuration');
}
cfg.API_KEY = process.env.API_KEY;

cfg.dataPath = path.join(path.dirname(__dirname), 'data');

module.exports = cfg;
