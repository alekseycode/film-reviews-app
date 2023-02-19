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


