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