import { Router } from 'express';
const lowerCase = require('lower-case');
const bas = require('../services/badge');
const fss = require('../services/file');
import auth from '../services/auth';

import cfg from '../config/config';

let router = Router();

/* GET badges listing. */
/*
router.get('/', function(req, res) {
    res.send('respond with a resource');
});
*/

router.get('/:badgeName', function(req, res) {
    let badgeName = lowerCase(req.params.badgeName);
    let filePath = cfg.dataPath + '/' + badgeName + '.json';

    if (!fss.checkFileExist(filePath)) {
        res.status(404).send(' ');
        return;
    }
    let fileData = fss.getFileData(filePath);
    if (!fileData) {
        res.status(500).send(' ');
        return;
    }
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(bas.getBadge(JSON.parse(fileData)));
});

router.post('/set', function(req, res) {
    auth.hasAuthValidFields(req, res);
    auth.isAuthValid(req, res);
    let data = req.body;

    let badgeData = bas.buildBadgeData(data);
    if (!badgeData) {
        res.status(400).json({Message: 'missing required data'});
        return;
    }

    //TODO: Sanitize badgeName
    badgeData.badgeName = lowerCase(badgeData.badgeName);
    let filePath = cfg.dataPath + '/' + badgeData.badgeName + '.json';
    let dataSave = JSON.stringify(badgeData);
    let fileWriteResult = fss.putFileData(filePath, dataSave);

    if (!fileWriteResult){
        res.status(500).json({Message: 'internal error'});
        return;
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({Message: 'ok'});
});

router.delete('/:badgeName', function(req, res) {
    auth.hasAuthValidFields(req, res);
    auth.isAuthValid(req, res);
    let badgeName = lowerCase(req.params.badgeName);
    let filePath = cfg.dataPath + '/' + badgeName + '.json';
    if (!fss.checkFileExist(filePath)) {
        res.status(404).send();
        return;
    }
    if (!fss.deleteFile(filePath)) {
        res.status(500).send(' ');
        return;
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(JSON.parse(JSON.stringify({Message: 'ok'})));
});

export default router;
