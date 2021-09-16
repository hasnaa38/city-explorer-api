'use strict';

class Cache {
    constructor(queries) {
        this.data = [];
        this.queries = queries;
        this.timestamp = new Date().getMinutes(); //I want it to be updated every 5 minutes
    }
}

module.exports = Cache;