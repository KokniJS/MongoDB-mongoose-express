const router = require('express').Router();
const User = require('../../models/user/user'); 
const jwt = require('jwt-simple')
const config = require('../../config')
const isAuth = require('./isAuth')





router.post('/register', async (req, res) => {
     if (!req.body.username || !req.body.password|| !req.body.phoneNumber || !req.body.email || !req.body.role){
         return res.sendStatus(400) 
     } else {
         const userData = {
            username: req.body.username,
 		    email:    req.body.email,
            phoneNumber: req.body.phoneNumber,
            password: req.body.password,
            role : req.body.role
          }
       await User.findOne(userData)
        .then(user => {
         if (user) {
             return null;
         } else {
             return User.create(userData);
         }
     })
     .then(user => {
         if (user) { 
             return res.sendStatus(201);
         } else {
             return res.status(400).json({ error: 'User already exist!'});
         }
     })
     .catch(err => {
         console.error('User.register', err);
         return res.sendStatus(400);
     })
   }
 });

 router.post('/login', async (req, res) => {
     if (!req.body.username) {
         return res.sendStatus(400) 
     } else {
         const { username } = req.body;

        
       await  User.findOne({username})

    .then(user => {
             if (user) { 
                 return res.json({token: jwt.encode(user, config.secretkey)});
             } else {
                 return res.status(404).json({ error: 'Username wrong!'});
             }
         })
         .catch(err => {
             console.error('User.login', err);
             return res.sendStatus(400);
         })

     } 
 });

router.get('/profile',isAuth, (req, res) => {
    const { username } = req.jwt;
    User.findOne({username})
    .then(user => {
        if (user) { 
            return res.json(user);
        } else {
            return res.status(404).json({ error: 'Username doesn\'t exist!'});
        }
    })
    .catch(err => {
        console.error('User.profile', err);
        return res.sendStatus(400);
    })
});
 


module.exports = router;