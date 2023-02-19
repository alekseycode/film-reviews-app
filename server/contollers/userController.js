const db = require('../db/weviewsDB');

const getUsers = async (req, res) => {
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

module.exports = {
  getUsers
}
