'use strict';

let Archive = requireLocal('app/models/archive.js');

module.exports = function(req, res)
{   'use strict';
    Archive.findOne({ _id: req.params.id }, '-__v', (err, archive) => {
        if(err || !archive)
            res.render('pages/error', {message: 'Tha archive doesn\'t exist! Find one that does <a href="/">here.</a>'});
        else {
            res.render('pages/archive', {
                archive: archive
            });
        }
    });
}
