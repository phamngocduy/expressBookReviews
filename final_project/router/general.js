const router = require('express').Router()
let books = require('./booksdb.js')
let isValid = require('./auth_users.js').isValid
let users = require('./auth_users.js').users


// Get the book list available in the shop
router.get('/', (req, res) => {
    res.send(books)
})
  
// Get book details based on ISBN
router.get('/isbn/:isbn', (req, res) => {
    const isbn = req.params.isbn
    res.send(books[isbn])
})

// Get book details based on author
router.get('/author/:author', (req, res) => {
    const author = req.params.author
    filteredBooks = []
    Object.keys(books).forEach(key => {
        if (books[key].author === author)
            filteredBooks.push(books[key])
    })
    res.send(filteredBooks)
})
  
// Get all books based on title
router.get('/title/:title', (req, res) => {
    const title = req.params.title
    filteredBooks = []
    Object.keys(books).map(key => {
        if (books[key].title === title)
            filteredBooks.push(books[key])
    })
    res.send(filteredBooks)
})

//  Get book review
router.get('/review/:isbn', (req, res) => {
    const isbn = req.params.isbn
    res.send(books[isbn].reviews)
})
  
  router.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

  



module.exports.router = router;
