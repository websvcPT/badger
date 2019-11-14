import { BadgeFactory } from 'gh-badges';

const bas = {};
const bf = new BadgeFactory();

const defaultObj = {
    badgeName: '',
    label: null,
    message: null,
    style: 'plastic',
    labelColor: 'blue',
    color: 'lightgrey',
    link: null
};

const requiredKeys = ['badgeName', 'label', 'message'];

bas.buildBadgeData = function (data) {
    if (!validate(data)) {
        return false;
    }

    let badgeData = defaultObj;
    for (let key in badgeData) {
        if (typeof data[key] != 'undefined') {
            badgeData[key] = data[key];
        }
    }
    return generateBadgeFormat(badgeData);
};

bas.getBadge = function (format) {
    return bf.create(format);
};

function validate(data) {
    return requiredKeys.every({}.hasOwnProperty.bind(data));
}

function generateBadgeFormat(badgeData) {
    return {
        text: [badgeData.label, badgeData.message],
        format: 'svg',
        color: badgeData.color,
        labelColor: badgeData.labelColor,
        template: badgeData.style,
        badgeName: badgeData.badgeName,
    };
}

module.exports = bas;
