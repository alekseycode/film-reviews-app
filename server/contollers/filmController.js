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

exports.getFilmById = async (req, res) => {
    try {
        const { id } = req.params;
        const row = await db.select('*').from('films').where({id:id})
       
        res.json({message: 'film', payload: row})
       
    } catch (e) {
        console.log(e);        
    }
}