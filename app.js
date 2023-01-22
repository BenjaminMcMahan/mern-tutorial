const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();
const books = require('./routes/api/books');
const users = require('./routes/api/users');

// Connect to the database
connectDB().then(() => console.log('Connected correctly to server'),
    err => console.log(err)
);

app.use(bodyParser.json());
app.use(passport.initialize({}));
app.use('/api/books', books);
app.use('/api/users', users);

app.get("/", (req, res) => res.send('Hello World'));


const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on ${port}`));