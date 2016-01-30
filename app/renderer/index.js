'use strict';

let Archive = requireLocal('app/models/archive.js');

module.exports = function(req, res)
{   'use strict';
    console.log('Got it baby');
    Archive.find({}, '-__v', (err, results) => {
        console.log('oh yeah');
        console.log(results);
        if(err) console.error(err);

        else {
            res.render('pages/index', {
                archives: results,
            });
        }
    });
}
