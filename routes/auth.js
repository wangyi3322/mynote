var express = require('express');
var router = express.Router();

var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

passport.serializeUser(function(user, done) {
   // console.log('---serializeUser---')
    console.log(user)
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
   // console.log('---deserializeUser---')
    done(null, obj);
});

passport.use(new GitHubStrategy({
        clientID: '879be8840420f7d2ec04',
        clientSecret: '6583cdf0f73a5ae6d5a194a11589530b8e322d3d',
        callbackURL: "http://127.0.0.1:3000/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        // User.findOrCreate({ githubId: profile.id }, function (err, user) {
        // });
        done(null, profile);
    }
));


router.get('/logout', function(req, res){
    req.session.destroy();
    res.redirect('/');
})

router.get('/github',
    passport.authenticate('github'));

router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
        req.session.user = {
            id: req.user.id,
            username: req.user._json.name,
            avatar: req.user._json.avatar_url,
            provider: req.user.provider
        };
        res.redirect('/');
    });

module.exports = router;
