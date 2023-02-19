const db = require('../db/weviewsDB');

exports.getUsers = async (req, res) => {
  try {
    await db.select('*').from('users')
    .then(rows => {
      console.log(rows);
      res.json({message: 'success', payload: rows})
  
      db.destroy();
    })
  } catch(e) {
    console.log(e)
  }
}


