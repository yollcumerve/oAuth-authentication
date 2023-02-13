const router = require('express').Router()
const passport = require('passport')

//Auth login
router.get('/login', (req,res) => {
    res.render('login')
})

//Auth with google
router.get('/google', passport.authenticate('google',{
    scope: ["profile"]
}))

//auth logout
router.get('/logout', (req,res) => {
    //handle with passport
    res.send('logging out')
})

//callback route for google to redirect to
router.get('/google/cb', passport.authenticate('google'),(req,res) => {
    res.send(req.user)
})

module.exports = router