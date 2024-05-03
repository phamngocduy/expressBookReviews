const express = require('express')
const jwt = require('jsonwebtoken')
const session = require('express-session')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', require('./router/general.js').router)
app.use("/customer", require('./router/auth_users.js').authenticated);
app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
//Write the authenication mechanism here
});
 


const PORT = 5000
app.listen(PORT, () => console.log('Server is running at port', PORT))