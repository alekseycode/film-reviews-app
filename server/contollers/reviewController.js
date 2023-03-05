const connectToDB = require('../db/weviewsDB')

exports.getReviews = async (req, res) => {
    const db = await connectToDB();
    try {
        await db.select('*').from('reviews')
        .then(rows => {
            res.json({message: 'reviews', payload: rows})
        })
    } catch (e) {
        console.log(e);
    } finally {
        db.destroy();
        console.log('Connection destroyed');
      }
}

exports.getReviewsByFilmId = async (req, res) => {
    const db = await connectToDB();
    try {
        const { id } = req.params;
       const rows = await db.select('*').from('reviews').where({ film_id: id })
        
        res.json({message: 'reviews', payload: rows})
    } catch (e) {
        console.log(e);    
    } finally {
        db.destroy();
        console.log('Connection destroyed');
      }
}