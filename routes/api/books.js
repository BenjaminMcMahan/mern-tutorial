const express = require('express');
const router = express.Router();

// Load the Book model
const Book = require('../../models/Book');

/**
 * @route GET api/books/test
 * @description Get all books
 * @access Public
 */
router.get('/test', (req, res) =>
    res.send('book route testing!')
);

/**
 * @route GET api/books
 * @description Get all books
 * @access Public
 */
router.get('/', (req, res) => {
    Book.find()
        .then(books => res.json(books))
        .catch(err => res.status(404).json({noBooksFound: 'No books found'}));
});

/**
 * @route GET api/books/:id
 * @description Get single book by ID
 * @access Public
 */
router.get('/:id', (req, res) => {
    Book.findById(req.params.id)
        .then(book => res.json(book))
        .catch(err => res.status(404).json({noBookFound: "No Book Found"}));
});

/**
 * @route POST api/books
 * @description Add a book
 * @access Public
 */
router.post('/', (req, res) => {
    Book.create(req.body)
        .then(book => res.json({msg: 'Book added successfully'}))
        .catch(err => res.status(400).json({error: `Unable to save book, ${err}`}));
});

/**
 * @route PUT api/books/:id
 * @description Update a book
 * @access Public
 */
router.put('/:id', (req, res) => {
    Book.findByIdAndUpdate(req.params.id, req.body)
        .then(book => res.json({msg: 'Updated successfully'}))
        .catch(err => {
            res.status(400).json({error: `Unable to update the book, ${err}`});
        });
});

/**
 * @route DELETE api/books/:id
 * @description delete a book
 * @access Public
 */
router.delete('/:id', (req, res) => {
    Book.findByIdAndRemove(req.params.id, req.body)
        .then(book => res.json({msg: 'Book entry deleted successfully'}))
        .catch(err => {
            res.status(400).json({error: `Unable to delete the book, ${err}`});
        });
});

module.exports = router;