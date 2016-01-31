'use strict';

require('./require-helpers.js');
global.baseDir = __dirname;
console.log(global.baseDir);

let databaseConfig = requireConfig('database.js');

let express = require('express');
let app = express();

let bodyParser = require('body-parser');
let mongoose = require('mongoose');

console.log('Connecting to db on', databaseConfig.url);
mongoose.connect(databaseConfig.url);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));

requireLocal('app/routes.js')(app);

app.listen(3000, () => {
    console.log('Listening on', 3000);
})
