const db = require('../db/weviewsDB');
const uuidv4 = require('uuid').v4;
const bcrypt = require('bcrypt');

exports.postLogin = async (req, res) => {
    console.log('sup')
   res.sendStatus(200)
}

// exports.postLogin = async (req, res) => {
//     const { username, password } = req.body;

//     if (username !== 'Tom' || password !== 'jellybeans') {
//      return res.status(401).send('Incorrect username or password.');
//     }

//     const sessionId = uuidv4();
//     sessions[sessionId] = { username, userId: 1 }
//     res.set('Set-Cookie', `session=${sessionId}`)
//     res.end('success')
// }