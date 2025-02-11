const express = require("express");

const PORT = require('./config');
// const mongoDBURL = require('./config');
const mongoDBURL = 'mongodb://0.0.0.0/mydb1';

const BookStore = require('./models/bookModel');

const mongoose = require('mongoose');

const app = express();
// middleware for parsing request body
app.use(express.json());

// first http get routes 
app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send("Welcome To MERN Stack Project");
})

// routes for save new books
app.post('/books', async (request, response) => {
    try {
        if (!request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        )
         {
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

// database connection
mongoose.connect(mongoDBURL)
    .then(() => {
        console.log("App is connected to mongoDB Database");
    })
    .catch((error) => {
        console.log(error);
    })


app.listen(PORT, () => {
    console.log(`Server running at port:${PORT}`);
});