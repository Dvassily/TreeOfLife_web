import {getConnection} from "./db";

const router = require('express').Router();
const passport = require('passport');
var jwt = require('jsonwebtoken');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;


// Logique d'authentification JWT
module.exports = function(passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader("token");
    opts.secretOrKey = "aabb";

    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {

        let db = getConnection();

        db.collection("members").find({
            mail: jwt_payload.mail,
        }).toArray((err, documents) => {

            if(documents.length <= 0 || err) {
                return done(null, false)
            }

            done(null, user)
        });

    }));
};
