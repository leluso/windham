'use strict';

let Archive = requireLocal('app/models/archive.js');

module.exports = function(req, res)
{   'use strict';
    let query = req.params.query || req.query.query;
    if(query !== undefined && query != null)
    {
        let searchRegex = new RegExp(query, 'gi');

        Archive.find({
            $or: [
                { title: searchRegex },
                { source: searchRegex },
            ],
        }, (err, results) => {
            res.render('pages/search', {
                archives: results,
                query: query,
            });
        })
    }

    else {
        res.render('pages/search', {
            archives: [],
            query: undefined,
        });
    }
}
