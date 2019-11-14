import express from 'express';
import path from 'path';
import logger from 'morgan';
import cfg from './config/config';

const debug = require('debug')('server:debug');

// Import Routes
import indexRouter from './routes/index';
import badgesRouter from './routes/badges';

const app = express();

app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.use('/', indexRouter);
app.use('/badges', badgesRouter);

const listen = app.listen(cfg.PORT,
    () => {
        console.log(`Listening on http://${cfg.HOST}:${cfg.PORT}`);
        debug('Configuration vars:');
        debug(cfg);
    }
);

module.exports = app;
module.exports.port = listen.address().port;
