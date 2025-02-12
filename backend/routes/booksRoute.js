const express = require('express');
const BookStore = require("../models/bookModel");

const router = express.Router();

// routes for save new book in Database
router.post('/', async (request, response) => {
    try {
        if (!request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: "Send all required fields: title, author, publishYear"
            })
        }

        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        }

        const book = await BookStore.create(newBook);
        return response.status(201).send(book);

    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

// route for get all books from Database
router.get('/', async (request, response) => {
    try {
        const books = await BookStore.find({});
        return response.status(200).send({
            count: books.length,
            data: books
        })

    }
    catch (error) {
        console.log(error);
        return response.status(500).send({
            message: error.message
        })
    }
})

// route for get one book from Database by id
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const book = await BookStore.findById(id);
        return response.status(200).send(book);
    }
    catch (error) {
        console.log(error);
        return response.status(500).send({
            message: error.message
        })
    }
})

// route for update a book
router.put('/:id', async (request, response) => {
    try {
        if (!request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: "Send all required fields: title, author, publishYear"
            });
        }

        const { id } = request.params;
        const result = await BookStore.findByIdAndUpdate(id, request.body);
        if (!result) {
            return response.status(404).json({ message: "Book not found" });
        }

        return response.status(200).send({ message: "Book updated successfully" });
    }
    catch (error) {
        console.log(error);
        response.status(500).send({
            message: error.message
        })
    }
})

// route for delete book
router.delete('/:id', async (request, response) => {

    try {
        const { id } = request.params;

        const result = await BookStore.findByIdAndDelete(id);
        if (!result) {
            return response.status(404).json({ message: "Book not found" });
        }
        return response.status(200).send({ message: "Book deleted successfully" });
    }
    catch (error) {
        console.log(error);
        return response.status(500).send({
            message: error.message
        })
    }
})

module.exports = router;