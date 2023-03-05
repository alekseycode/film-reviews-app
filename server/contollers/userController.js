const connectToDB = require('../db/weviewsDB');

exports.getUsers = async (req, res) => {
  const db = await connectToDB();
  try {
    await db.select('*').from('users')
    .then(rows => {
      res.json({message: 'users', payload: rows})

    })
  } catch(e) {
    console.log(e)
  } finally {
    db.destroy();
    console.log('Connection destroyed');
  }
}

exports.getUsersById = async (req, res) => {
  const db = await connectToDB();
  try {
    const { id } = req.params;
   const user = await db.select('*').from('users').where({ id: id })
    
    res.json(user)
  } catch (e) {
    console.log(e);
  } finally {
    db.destroy();
    console.log('Connection destroyed');
  }
}

exports.getUsersReviewsByFilmId = async (req, res) => {
  const db = await connectToDB();
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
  } finally {
    db.destroy();
    console.log('Connection destroyed');
  }
}


