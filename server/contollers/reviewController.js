const db = require('../db/weviewsDB')

exports.getReviews = async (req, res) => {
    try {
        await db.select('*').from('reviews')
        .then(rows => {
            res.json({message: 'reviews', payload: rows})
        })
    } catch (e) {
        console.log(e);
    }
}

exports.getReviewsByFilmId = async (req, res) => {
    try {
        const { id } = req.params;
       const rows = await db.select('*').from('reviews').where({ film_id: id })
        
        res.json({message: 'reviews', payload: rows})
    } catch (e) {
        console.log(e);    
    }
}