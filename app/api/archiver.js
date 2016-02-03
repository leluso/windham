'use strict';

module.exports = {
    archive: archive, // post
    deleteArchive: deleteArchive, //delete
    getArchive: getArchive,
    getArchiveContents: getArchiveContents,
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
                let requestedConnection = new Horseman().viewport(800, 600).open(req.body.source);
                async.parallel([
                    (connectionCallback) => {
                        let requestedConnection = new Horseman().viewport(800, 600).open(req.body.source);

                        requestedConnection.html()
                            .then((data) => {
                                archive.webPage.contents = data;//.replace(/<link.*>/g, '').replace(/<script.*<\/script>/g, '');
                                process.nextTick(connectionCallback);
                            });
                    },

                    (connectionCallback) => {
                        let requestedConnection = new Horseman().viewport(800, 600).open(req.body.source);
                        
                        requestedConnection.screenshotBase64('PNG')
                            .then((data) => {
                                archive.webPage.preview = generateBase64DataURI('image/png', null, data);
                                process.nextTick(connectionCallback);
                            });
                    },
                ], callback);
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


function getArchiveContents(req, res)
{
    getArchive(req, res, true);
}

function getArchive(req, res, jc)
{
    let requestedId = req.params.id;
    let justContents = jc === true || false;

    Archive.findOne({_id: requestedId}, '-__v', (err, result) => {
        console.log(result, justContents);
        if(err || !result)
        {
            res.status(400).send();
        }

        else if(!justContents)
        {
            res.send(result);
        }

        else {
            if(result.webPage.contents)
            {
                res.send(result.webPage.contents)
            }

            else if(result.text.contents)
            {
                res.send(result.webPage.content);
            }

            else if(result.image.data)
            {
                res.send(result.image.data);
            }

            else if(result.audio.data)
            {
                res.send(result.audio.data);
            }

            else if(result.video.data)
            {
                res.send(result.video.data);
            }

            else if(result.file.data)
            {
                res.send(result.file.data);
            }
        }
    })
}

function generateBase64DataURI(mimeType, charset, data)
{   'use strict';
    let uri = 'data:';
    if(mimeType)
    {
        uri += mimeType;
    }

    if(charset)
    {
        uri += ';charset=' + charset;
    }

    uri += ';base64,' + data;
    return uri
}
