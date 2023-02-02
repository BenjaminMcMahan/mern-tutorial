const express = require('express');

// Load the Book model
const Book = require('../../models/Book');
const cors = require("./cors");
// Define a router
const bookRouter = express.Router();


bookRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
    .get(cors.cors, (req, res) => {
        Book.find()
            .then(books => res.json(books))
            .catch(err => res.status(404).json({noBooksFound: 'No books found'}));
    })
    .post(cors.cors, (req, res) => {
        Book.create(req.body)
            .then(book => res.json({msg: `Book added successfully, ${book}`}))
            .catch(err => res.status(400).json({error: `Unable to save book, ${err}`}));
    });

bookRouter.route('/:id')
    .options(cors.corsWithOptions, (req, res) => res.statusCode(200))
    /**
     * @route GET api/books/:id
     * @description Returns a book
     * @access Public
     */
    .get((req, res) => {
        Book.findById(req.params.id)
            .then(book => res.json(book))
            .catch(err => res.status(404).json({noBookFound: "No Book Found"}));
    })
    /**
     * @route PUT api/books/:id
     * @description Update a book
     * @access Public
     */
    .put(cors.corsWithOptions, (req, res) => {
        Book.findByIdAndUpdate(req.params.id, req.body)
            .then(book => res.json({msg: 'Updated successfully'}))
            .catch(err => {
                res.status(400).json({error: `Unable to update the book, ${err}`});
            });
    })
    /**
     * @route DELETE api/books/:id
     * @description delete a book
     * @access Public
     */
    .delete(cors.corsWithOptions, (req, res) => {
        Book.findByIdAndRemove(req.params.id, req.body)
            .then(book => res.json({msg: 'Book entry deleted successfully'}))
            .catch(err => {
                res.status(400).json({error: `Unable to delete the book, ${err}`});
            });
    });

module.exports = bookRouter;