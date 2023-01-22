const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');

const app = express();
const books = require('./routes/api/books');

// Connect to the database
connectDB();

app.use(bodyParser.json());
app.use('/api/books', books);

app.get("/", (req, res) => res.send('Hello World'));


const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on ${port}`));