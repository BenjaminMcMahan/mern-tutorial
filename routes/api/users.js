const express = require('express');
const User = require('../../models/User');
const passport = require('passport');
const authenticate = require('../../authenticate');
const cors = require('./cors');

const router = express.Router();

/* GET users listing. */
router.route('/')
    .get(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        User.find()
            .then(users => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(users);
            })
            .catch(err => next(err));
    });

router.post('/signup', cors.corsWithOptions, (req, res) => {
    User.register(
        new User({username: req.body.username}),
        req.body.password,
        (err, user) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.json({err: err});
            } else {
                // Set the first and last names
                if (req.body.firstname) {
                    user.firstname = req.body.firstname;
                }
                if (req.body.lastname) {
                    user.lastname = req.body.lastname;
                }

                user.save(err => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({err: err});
                        return;
                    }
                    passport.authenticate('local')(req, res, () => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({success: true, status: 'Registration Successful'});
                    });
                });
            }
        }
    );
});

// TODO: Review login strategies
// router.post('/login', cors.corsWithOptions, passport.authenticate('local'), (req, res) => {
//     // Login Successful, send a response
//     const token = authenticate.getToken({_id: req.user.id});
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'application/json');
//     res.json({success: true, token, status: "You are successfully logged in!"});
// });
router.post('/login', passport.authenticate('local', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login',
    failureMessage: true
}));
router.get('/logout', cors.corsWithOptions, (req, res, next) => {
    // TODO find a solution that does not require sessions
    req.logout((err) => {
        if (err) { return next(err)}

        return res.redirect('/');
    })
    // if (req.session) {
    //     // A session exists. Delete it
    //     req.session.destroy();
    //     res.clearCookie('session-id'); // Clear the cookie
    //     res.redirect('/'); // Redirect to main
    // } else {
    //     // The session does not exist, logging out without being logged in
    //     const err = new Error('You are not logged in!');
    //     err.status = 401;
    //     return next(err);
    // }
});

router.get('/facebook/token', passport.authenticate('facebook-token'), (req, res) => {
    if (req.user) {
        const token = authenticate.getToken({_id: req.user._id});
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true, token: token, status: 'You are successfully logged in!'});
    }
});

module.exports = router;
