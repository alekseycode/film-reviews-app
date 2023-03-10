const {db} = require('../db/weviewsDB');


exports.getFilms = async (req, res) => {
    try {
        const rows = await db('films');
        return res.json({ message: 'films', payload: rows });
    } catch (e) {
        console.log(e);
        return res.json({ message: e.message || "Something went wrong" });
    }
}

exports.getFilmById = async (req, res) => {
    const { id } = req.params;
    try {
        const row = await db('films').where({ id })
       return  res.json({message: 'film', payload: row})
       
    } catch (e) {
        console.log(e);       
        return res.json({ message: e.message || "Something went wrong" });
    } 
}

