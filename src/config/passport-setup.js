const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../model/user-model')

passport.serializeUser((user,done) => {
    done(null,user.id)
})

passport.deserializeUser((id,done) => {
    User.findById(id).then((user) => {
        done(null,user)

    })
})


passport.use(new GoogleStrategy({
        //options for the Google strategy
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_REDIRECT_URL
    }, (accessToken, refreshToken, profile, done) => {
        //check if user already exist
    console.log(profile)
        User.findOne({googleId: profile.id}).then((currentUser) => {
            if (currentUser) {
                //already have the user
                console.log('user is', currentUser)
                done(null,currentUser)
            } else {
                new User({
                    username: profile.displayName,
                    googleId: profile.id,
                    thumbnail: profile._json.picture

                }).save().then((newUser) => {
                    console.log('new user created:' + newUser)
                    done(null,newUser)
                })
            }
        })


    })
)

