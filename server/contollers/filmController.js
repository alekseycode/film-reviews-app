const connectToDB = require('../db/weviewsDB');


exports.getFilms = async (req, res) => {
    const db = await connectToDB();
    try {
        await db.select('*').from('films')
        .then(rows => {
            res.json({message: 'films', payload: rows})
        })
       
    } catch (e) {
        console.log(e);
    } finally {
        db.destroy();
        console.log('Connection destroyed');
      }
}

exports.getFilmById = async (req, res) => {
    const db = await connectToDB();
    try {
        const { id } = req.params;
        const row = await db.select('*').from('films').where({id:id})
       
        res.json({message: 'film', payload: row})
       
    } catch (e) {
        console.log(e);        
    } finally {
        db.destroy();
        console.log('Connection destroyed');
      }
}

