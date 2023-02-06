const userModel = require('../model/items')
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;


const {jwtConfig} = require('../config/Configs')


passport.use(
    new JwtStrategy({
        secretOrKey: jwtConfig.SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    (jwt_payload, done) => {
        userModel.findOne({
            _id: jwt_payload._id
        }, (error, user) => {
            if (error) {
                return done(error, false)

            } else if (user) {
                return done(null, user)

            } else {
                return done(null, false)
            }

        })
    })
)

