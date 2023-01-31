const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const passport = require('passport');
require('dotenv').config();

const app = express();
const books = require('./routes/api/books');
const users = require('./routes/api/users');
const session = require("express-session");
const {cors} = require("./routes/api/cors");

// Connect to the database
connectDB().then(() => console.log('Connected correctly to server'),
    err => console.log(err)
);

app.set('trust proxy', 1); // trust first proxy
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {secure: true}
}));

app.use(bodyParser.json());
app.use(passport.initialize({}));
app.use(passport.session({}));
app.use(cors);

app.use('/api/books', books);
app.use('/api/users', users);

app.get("/", (req, res) => res.send('Hello World'));


const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on ${port}`));