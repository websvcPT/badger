import cfg from '../config/config';

const auth = {};

auth.hasAuthValidFields = function (req, res) {
    if (req.headers['authorization']) {
        try {
            if (!getAuthToken(req)) {
                return res.status(403).send();
            } else {
                return true;
            }
        } catch (err) {
            console.log(err);
            return res.status(403).send();
        }
    } else {
        return res.status(401).send();
    }
};

auth.isAuthValid = function (req, res) {
    let authToken = getAuthToken(req);
    if (authToken == cfg.API_KEY) {
        return true;
    }
    return res.status(403).send();
};

function getAuthToken(req) {
    let authorization = req.headers['authorization'].split(' ');
    if (authorization[1].trim() == '') {
        return false;
    }
    return authorization[1].trim();
}

module.exports = auth;
