'use strict';

require('./require-helpers.js');
global.baseDir = __dirname;
console.log(global.baseDir);

let config = requireConfig('database.js');

let express = require('express');
let app = express();

let bodyParser = require('body-parser');
let mongoose = require('mongoose');

console.log('Connecting to db on', config.url);
mongoose.connect(config.url);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

requireLocal('app/routes.js')(app);

app.listen(3000, () => {
    console.log('Listening on', 3000);
})
