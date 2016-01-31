'use strict';

module.exports = {
    archive: archive, // post
}

let Archive = requireLocal('app/models/archive.js');

let Horseman = require('node-horseman');
let async = require('async');

function archive(req, res)
{
    let archive = new Archive();

    archive.title = req.body.title;
    archive.source = req.body.source;

    async.series([
        (callback) => {
            if(req.body.contents)
            {
                archive.text.contents = req.body.contents;
                process.nextTick(callback);
            }
            else if(req.body.audio)
            {
                archive.audio.data = req.body.audio.data;
                process.nextTick(callback);
            }

            else
            {
                console.log('Aight so weuh doin dis');
                let requestedConnection = new Horseman().open(req.body.source)
                    .html()
                    .then((data) => {
                        console.log('We got da html');
                        archive.webPage.contents = data;
                        process.nextTick(callback);
                    });
            }

        },

        (callback) => {
            archive.save((err, archive) => {
                if(err)
                {
                    res.status(400).send({
                        error: err,
                    });
                    console.error(err);
                }

                else {
                    res.send({
                        error: null,
                        archive: archive,
                    });
                }
                process.nextTick(callback);
            });
        }
    ]);
}
