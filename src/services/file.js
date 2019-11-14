import { writeFileSync, readFileSync, existsSync, unlinkSync } from 'fs';
import glob from 'glob';

const fss = {};

fss.checkFileExist = function(filePath) {
    try {
        if (existsSync(filePath)) {
            return true;
        }
    } catch(err) {
        console.error(err);
        return false;
    }
};

fss.getFileData = function(filePath) {
    try {
        return readFileSync(filePath);
    } catch(err) {
        console.error(err);
        return false;
    }
};

fss.putFileData = function(filePath, data) {
    try {
        writeFileSync(filePath, data);
        return true;
    } catch(err) {
        console.error(err);
        return false;
    }
};

fss.deleteFile = function(filePath) {
    try {
        unlinkSync(filePath);
        return true;
    } catch(err) {
        console.error(err);
        return false;
    }
};

fss.fileList = function(filePathWithPattern, options = {}) {
    return glob.sync(filePathWithPattern, options);
};

module.exports = fss;
