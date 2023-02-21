const userModel = require('../model/items')
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const {jwtConfig} = require('../config/Configs')


const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtConfig.SECRET,
}

passport.use(
    new JwtStrategy(options,
    (jwt_payload, done) => {
        userModel.findById({
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



