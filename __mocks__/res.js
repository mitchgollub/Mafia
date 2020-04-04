'use strict';

const res = {};

res.status = function (statusCode) {
    this.statusCode = statusCode
    return {
        json: (object) => {
            res.json = object
        }
    }
};

res.statusCode = 0;
res.json = {};

module.exports = res;