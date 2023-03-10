const {db} = require('../db/weviewsDB');

exports.getUsers = async (req, res) => {
  try {
   const users = await db('users')
  return res.json({message: 'users', payload: users})
  } catch(e) {
    console.log(e)
  } 
}

exports.getUsersById = async (req, res) => {
  try {
    const { id } = req.params;
   const user = await db('users').where({ id })
   return res.json(user)
  } catch (e) {
    console.log(e);
  } 
}

exports.getUsersReviewsByFilmId = async (req, res) => {

  try {

    const { id } = req.params;

    const rows = await db.select('reviews.id', 'reviews.review', 'users.username')
      .from('reviews')
        .join('users', 'reviews.user_id', '=', 'users.id')
        .where('reviews.film_id', id)
    
       return res.json({message: 'Users with reviews', payload: rows})
    
  } catch (e) {
    console.log(e);
  } 
}


