const router = require('express').Router()
const jwt = require('jsonwebtoken')
let books = require("./booksdb.js")

let users = [];

function isValid(username) { //returns boolean
    let usersWithSameName = users.filter(user => {
        return user.username === username
    })
    return usersWithSameName.length > 0
}

router.post('/register', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    if (username && password) {
        if (!isValid(username)) { 
            users.push({'username': username, 'password': password})
            return res.status(200).json({message: 'User successfully registred. Now you can login'})
        }
        return res.status(404).json({message: 'User already exists!'})    
    }
    return res.status(404).json({message: 'Unable to register user.'})
})

function authenticatedUser(username, password) { //returns boolean
    let validUsers = users.filter(user => {
        return user.username === username && user.password === password
    })
    return validUsers.length > 0
}

// Only registered users can login
router.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    if (!username || !password)
        return res.status(404).json({MESSAGE: 'Error logging in'})

    if (authenticatedUser(username, password)) {
        let accessToken = jwt.sign({
            data: password
        }, 'customer', { expiresIn: 60 * 60 })
        
        req.session.authorization = {
            accessToken, username
        }
        return res.status(200).send("User successfully logged in")
    } else
        return res.status(208).json({MESSAGE: "Invalid Login. Check username and password"})
})

// Add a book review
router.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.router = router