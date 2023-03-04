const db = require('../db/weviewsDB');
const uuidv4 = require('uuid').v4;
const bcrypt = require('bcrypt');

exports.postLogin = async (req, res) => {
    const { username, password } = req.body;

    const user = await db('users')
        .where({ username, password })
        .select('username', 'password')

    if (!user) {
     return res.status(401).send('Incorrect username or password.');
    } else {
        if (req.session.user) {
            // user is already logged in
            res.json({message: 'User is already logged in'});
        } else {
            req.session.user = { username: req.username, password: req.password }
            res.json({ message: `Welcome, ${req.body.username}!`})
          }
    }
}

exports.logOut = async (req, res) => {
    // destroy the session and redirect the user to the home page
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
      } else {
        res.json({message: 'Succesfully logged out. Goodbye!'});
      }
    });
  };