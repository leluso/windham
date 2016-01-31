'use strict';

module.exports = {
    archive: archive, // post
    deleteArchive: deleteArchive, //delete
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

            else if(req.body.video)
            {
                archive.video.data = req.body.video.data;
                process.nextTick(callback);
            }

            else if(req.body.image)
            {
                archive.image.data = req.body.image.data;
                process.nextTick(callback);
            }

            else if(req.body.file)
            {
                archive.file.data = req.body.file.data;
                process.nextTick(callback);
            }

            else
            {
                let requestedConnection = new Horseman().open(req.body.source)
                    .html()
                    .then((data) => {
                        archive.webPage.contents = data.replace(/<link.*>/g, '').replace(/<script.*<\/script>/g, '');
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

function deleteArchive(req, res)
{   'use strict';
    let id = req.params.id;

    Archive.remove({ _id: id }, (err) => {
        if(err) res.status(500);
        else res.status(200);

        res.send();
    })
}
