'use strict';

let Archive = requireLocal('app/models/archive.js');

module.exports = function(req, res)
{   'use strict';
    Archive.find({}, '-__v', (err, results) => {
        if(err) console.error(err);

        else {
            res.render('pages/index', {
                archives: results,
            });
        }
    });
}
