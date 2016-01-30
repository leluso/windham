'use strict';

module.exports = {
    archive: archive, // post
}

let Archive = requireLocal('app/models/archive.js');

function archive(req, res)
{
    let archive = new Archive();

    archive.title = req.body.title;
    archive.source = req.body.source;

    if(req.body.contents)
    {
        archive.text.contents = req.body.contents;
    }
    else if(!req.body.file)
    {

    }


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

    })
}
