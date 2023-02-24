const db = require('../db/weviewsDB');

exports.getUsers = async (req, res) => {
  try {
    await db.select('*').from('users')
    .then(rows => {
      res.json({message: 'users', payload: rows})

    })
  } catch(e) {
    console.log(e)
  }
}

exports.getUsersById = async (req, res) => {
  try {
    const { id } = req.params;
   const user = await db.select('*').from('users').where({ id: id })
    
    res.json(user)
  } catch (e) {
    console.log(e);
  }
}

exports.getUsersReviewsByFilmId = async (req, res) => {
  try {

    const { id } = req.params;

      await db.select('reviews.id', 'reviews.review', 'users.username')
      .from('reviews')
        .join('users', 'reviews.user_id', '=', 'users.id')
        .where('reviews.film_id', id)
      .then((rows) => {
        res.json({message: 'Users with reviews', payload: rows})
      })
    
    
  } catch (e) {
    console.log(e);
  }
}


