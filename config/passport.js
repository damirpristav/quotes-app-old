// load dependencies
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');

// load User model
const User = require('../models/User');

// load config
const config = require('./config');

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secreteOrPrivateKey;

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id).then(user => {
            if(user){
                return done(null, user);
            }
            return done(null, false);
        }).catch(err => {
            //console.log(err);
        });
    }));
}
