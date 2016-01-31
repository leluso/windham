'use strict';

let indexRenderer = requireLocal('app/renderer/index.js');
let submitRenderer = requireLocal('app/renderer/submit.js');
let searchRenderer = requireLocal('app/renderer/search.js');
let archiver = requireLocal('app/api/archiver.js');

module.exports = function(app) {
    app.get('/', indexRenderer);
    app.get('/submit', submitRenderer);
    app.get('/search', searchRenderer);
    app.get('/search/:query', searchRenderer);

    app.post('/api/archive', archiver.archive);
}
