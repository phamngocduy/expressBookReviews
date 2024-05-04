const router = require('express').Router()
const jwt = require('jsonwebtoken')
let books = require("./booksdb.js")

let users = []

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

router.get('/register', (req, res) => {
    res.redirect('/customer/register.html')
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
        return res.status(404).json({message: 'Error logging in'})

    if (authenticatedUser(username, password)) {
        let accessToken = jwt.sign({
            data: password
        }, 'customer', { expiresIn: 60 * 60 })
        
        req.session.authorization = {
            accessToken, username
        }
        return res.status(200).json({message: 'User successfully logged in'})
    } else
        return res.status(208).json({message: 'Invalid Login. Check username and password'})
})

router.get('/login', (req, res) => {
    res.redirect('/customer/login.html')
})

// Add a book review
router.put('/auth/review/:isbn', (req, res) => {
    const isbn = req.params.isbn
    const review = req.body.review
    const username = req.session.authorization.username

    selectedBook = books[isbn]
    if (selectedBook != undefined) {
        selectedBook.reviews[username] = review
        return res.status(200).json({message: `The review for the book with ISBN ${isbn} has been added/updated.`})
    }
    return res.status(208).json({message: 'Book not found'})
})

// Delete a book review
router.delete('/auth/review/:isbn', (req, res) => {
    const isbn = req.params.isbn
    const username = req.session.authorization.username

    selectedBook = books[isbn]
    if (selectedBook != undefined) {
        delete selectedBook.reviews[username]
        return res.status(200).json({message: `Reviews for the ISBN ${isbn} posted by the user ${username} deleted.`})
    }
    return res.status(208).json({message: 'Book not found'})
})

module.exports.router = router