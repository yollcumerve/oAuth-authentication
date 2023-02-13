const app = require('express')()
require('dotenv').config({debug: true})
const PORT = process.env.PORT || 3000
const path = require('path')
const passportSetup = require('./config/passport-setup')
const dbConnection = require('./config/dbConnection')
const cookieSession = require('cookie-session')
const passport = require('passport')

//set up view engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './views'))

app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys: [process.env.COOKIE_KEY]
}))

//initialize passport
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req,res) => {
    res.render('home')
})

app.use('/auth', require('./routes/auth-routes'))

app.listen(PORT, () => {
    console.log('-------------')
    console.log('Google Oauth Backend:',PORT)
    console.log('-------------')

})