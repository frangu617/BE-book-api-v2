const express = require("express");
const books = express.Router();
const Book = require("../models/books.js");

// const DATA = [
//     {
//         "title": "The Shinobi Initiative",
//         "description": "The reality-bending adventures of a clandestine service agency in the year 2166",
//         "year": 2014,
//         "quantity": 10,
//         "imageURL": "https://imgur.com/LEqsHy5.jpeg"
//     },
//     {
//         "title": "Tess the Wonder Dog",
//         "description": "The tale of a dog who gets super powers",
//         "year": 2007,
//         "quantity": 3,
//         "imageURL": "https://imgur.com/cEJmGKV.jpg"
//     },
//     {
//         "title": "The Annals of Arathrae",
//         "description": "This anthology tells the intertwined narratives of six fairy tales.",
//         "year": 2016,
//         "quantity": 8,
//         "imageURL": "https://imgur.com/VGyUtrr.jpeg"
//     },
//     {
//         "title": "Wâˆ€RP",
//         "description": "A time-space anomaly folds matter from different points in earth's history in on itself, sending six unlikely heroes on a race against time as worlds literally collide.",
//         "year": 2010,
//         "quantity": 4,
//         "imageURL": "https://imgur.com/qYLKtPH.jpeg"
//     }
// ]


// //seed
// books.get("/seed", (req, res) => {
//     Book.insertMany(DATA)
//         .then((createdBooks) => 
//         res.status(200).json({
//             message: 'Seed successful'
//         }))
//         .catch(res.status(400).json({
//             message: 'Seed unsuccessful'
//         }))
// })
books.get('/seed', (req, res) => {
    Book.insertMany([{
        "title": "The Shinobi Initiative",
        "description": "The reality-bending adventures of a clandestine service agency in the year 2166",
        "year": 2014,
        "quantity": 10,
        "imageURL": "https://imgur.com/LEqsHy5.jpeg"
      },
      {
        "title": "Tess the Wonder Dog",
        "description": "The tale of a dog who gets super powers",
        "year": 2007,
        "quantity": 3,
        "imageURL": "https://imgur.com/cEJmGKV.jpg"
      },
      {
        "title": "The Annals of Arathrae",
        "description": "This anthology tells the intertwined narratives of six fairy tales.",
        "year": 2016,
        "quantity": 8,
        "imageURL": "https://imgur.com/VGyUtrr.jpeg"
      },
      {
        "title": "Wâˆ€RP",
        "description": "A time-space anomaly folds matter from different points in earth's history in on itself, sending six unlikely heroes on a race against time as worlds literally collide.",
        "year": 2010,
        "quantity": 4,
        "imageURL": "https://imgur.com/qYLKtPH.jpeg"
      }])
        .then(res.status(200).json({
            message: 'Seed successful'
        }))
        .catch(res.status(400).json({
            message: 'Seed unsuccessful'
        }))
})

// Index: /books
books.get("/", (req, res) => {
    Book.find().then((foundBooks) => {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        // res.json(foundBooks);
        res.send(JSON.stringify(foundBooks, null, 4)); // Pretty print with 4 spaces indentation

    });
});

// Show: /books/:_id
books.get("/:_id", (req, res) => {
    Book.findOne({ _id: req.params._id})
        .then((foundBook) => {
            if (!foundBook) {
                return res.json({
                    message: "No book found with that title",
                });

            }
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            //   res.json(foundBook);

            res.send(JSON.stringify(foundBook, null, 4)); // Pretty print with 4 spaces indentation


        })
        .catch((err) => {
            return res.json({
                error: "Item not found",
                status: 401,
            });
        });
});

// Create: /books
books.post("/", (req, res) => {
    Book.create(req.body)
        .then((newBook) => {
            res.status(201).json(newBook);
        })
        .catch((err) => {
            res.json(err);
        });
});

// Update: /books/:_id
books.put("/:_id", (req, res) => {
    Book.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true })
        .then((updatedBook) => {
            res.json(updatedBook);
        })
        .catch((err) => {
            res.json(err);
        });
});

books.delete("/:_id", (req, res) => {
    Book.deleteOne({ _id: req.params._id })
        .then((deletedBook) => {
            res.json(deletedBook);
        })
        .catch((err) => {
            res.json(err);
        });
})

module.exports = books;