const router = require('express').Router()
let books = require('./booksdb.js')


// Get the book list available in the shop
router.get('/', (req, res) => {
    new Promise((resolve, reject) => {
        try {
            resolve(require('./booksdb.js'))
        } catch (error) {
            console.log(error)
            reject(error.message)
        }
    }).then(books => res.send(books),
            error => res.status(208).send(error))
})
  
// Get book details based on ISBN
router.get('/isbn/:isbn', (req, res) => {
    const isbn = req.params.isbn
    new Promise((resolve, reject) => {
        try {
            let books = require('./booksdb.js')
            resolve(books[isbn])
        } catch (error) {
            console.log(error)
            reject(error.message)
        }
    }).then(books => res.send(books),
            error => res.status(208).send(error))
})

// Get book details based on author
router.get('/author/:author', (req, res) => {
    const author = req.params.author
    new Promise((resolve, reject) => {
        try {
            filteredBooks = []
            Object.keys(books).forEach(key => {
                if (books[key].author === author)
                    filteredBooks.push(books[key])
            })
            resolve(filteredBooks)
        } catch (error) {
            console.log(error)
            reject(error.message)
        }
    }).then(books => res.send(books),
            error => res.status(208).send(error))
})
  
// Get all books based on title
router.get('/title/:title', (req, res) => {
    const title = req.params.title
    new Promise((resolve, reject) => {
        try {
            filteredBooks = []
            Object.keys(books).map(key => {
                if (books[key].title === title)
                    filteredBooks.push(books[key])
            })
            resolve(filteredBooks)
        } catch (error) {
            console.log(error)
            reject(error.message)
        }
    }).then(books => res.send(books),
            error => res.status(208).send(error))
})

//  Get book review
router.get('/review/:isbn', (req, res) => {
    const isbn = req.params.isbn
    res.send(books[isbn].reviews)
})

module.exports.router = router