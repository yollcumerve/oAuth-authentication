const router = require('express').Router()
const passport = require('passport')

//Auth login
router.get('/login', (req,res) => {
    res.render('login', {user: req.user})
})

//Auth with google
router.get('/google', passport.authenticate('google',{
    scope: ["profile"]
}))

//auth logout
router.get('/logout', (req,res) => {
    //handle with passport
    req.logout()
    res.redirect('/')
})

//callback route for google to redirect to
router.get('/google/cb', passport.authenticate('google'),(req,res) => {
    res.redirect('/profile/')
})

module.exports = router