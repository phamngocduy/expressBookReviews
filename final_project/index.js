const express = require('express')
const jwt = require('jsonwebtoken')
const session = require('express-session')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', require('./router/general.js').router)
app.use('/customer', session({secret: 'phmngcduy', resave: true, saveUninitialized: true}))
app.use('/customer', require('./router/auth_users.js').router)

app.use('/customer/auth/*', (req, res, next) => {
    if (req.session.authorization) {
        token = req.session.authorization['accessToken']
        jwt.verify(token, 'customer', (err, user) => {
            if(!err) {
                req.user = user
                next()
            }
            else return res.status(403).json({MESSAGE: 'User not authenticated'})
        })
    } else res.redirect('/customer/login.html')
        //return res.status(403).json({MESSAGE: 'User not logged in'})
})

app.use('/customer', express.static('public'))

const PORT = 5000
app.listen(PORT, () => console.log('Server is running at port', PORT))