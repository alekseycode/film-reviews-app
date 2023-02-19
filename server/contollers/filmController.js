const db = require('../db/weviewsDB');

exports.getFilms = async (req, res) => {
    try {
        await db.select('*').from('films')
        .then(rows => {
            res.json({message: 'films', payload: rows})
        })
       
    } catch (e) {
        console.log(e);
    }
}