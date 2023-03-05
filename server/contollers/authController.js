const connectToDB = require('../db/weviewsDB');
const bcrypt = require('bcrypt');

exports.postLogin = async (req, res) => {
    const { username, password } = req.body;
     const db = await connectToDB();
    try {
        if (!username?.length || !password?.length) {
            return res.status(401).json({ error: 'Username or password cannot be empty'})
        }
    
        const user = await db('users')
            .where('username', username)
            .select('username', 'password')
            .first();
        
        const isPasswordMatch = await bcrypt.compare(password, user.password)
    
        if (!isPasswordMatch) {
            return res.status(401).json({error: 'Incorrect username or password'})
        }
    
        if (!user) {
         return res.status(401).send('Incorrect username or password.');
        } else {
            if (req.session.user) {
                // user is already logged in
                res.status(401).json({error: 'User is already logged in'});
            } else {
                req.session.user = { username: req.username, password: req.password }
                res.json({ message: `Welcome, ${req.body.username}!`})
              }
        }
    } catch (e) {
        console.log(e);  
    } finally {
        db.destroy();
        console.log('Connection destroyed');
      }
}

exports.logOut = async (req, res) => {
    // destroy the session and redirect the user to the home page
    const db = await connectToDB();
    try {
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
            } else {
                res.json({ message: 'Succesfully logged out. Goodbye!' });
            }
        });
    } catch (e) {
        console.log(e);
    } finally {
        db.destroy();
        console.log('Connection destroyed');
      }
};
  
exports.postRegister = async (req, res) => {
    const user = req.body;
    const db = await connectToDB();
    try {
        if (!user?.username?.length || !user?.password?.length || !user?.email?.length) {
            return res.status(401).json({ error: 'Username, password or email fields cannot be empty'})
         }
     
     
         const isExistingUser = await db.select('username')
             .from('users')
             .where('username', user.username)
             .first();
     
         if (isExistingUser) {
             return res.status(401).json({ error: 'User already exists' })
         }
     
         const saltRounds = 10;
         const hashedPassword = await bcrypt.hash(user.password, saltRounds);
     
         user.password = hashedPassword;
     
         const insertedUser = await db('users')
             .insert(user)
             .returning('*')
             .first()
         
         if (insertedUser) {
             res.json({success: 'Success'})
         }
    } catch (e) {
        console.log(e); 
    }  finally {
        db.destroy();
        console.log('Connection destroyed');
      } 
}


exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    const db = await connectToDB();
    try {
     const user = await db('users')
        .where('email', email)
        .first()
    
    if (!user) {
        res.status(400).json({error: 'Invalid email address'})
    }

    res.json({ success: 'success' });
} catch (e) {
    console.log(e);   
}  finally {
        db.destroy();
        console.log('Connection destroyed');
  }
}

exports.newPassword = async (req, res) => {
    const { username, password } = req.body;
    const db = await connectToDB();
    try {
         const saltRounds = 10;
         const hashedPassword = await bcrypt.hash(password, saltRounds);
     
        await db('users')
        .where('username', username)
        .update('password', hashedPassword)
    
    res.json({success: 'Successfully updated password'})
    } catch (e) {
        console.log(e);
    } finally {
        db.destroy();
        console.log('Connection destroyed');
      }
}