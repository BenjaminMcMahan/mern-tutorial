import React, {useState, useEffect} from "react";
import "../App.css";
import axios from "axios";
import {Link} from "react-router-dom";
import BookCard from "./BookCard";

const ShowBookList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:8082/api/books')
            .then((res) => {
                // Update the Books list with the returned entries
                setBooks(res.data);
            })
            .catch((err) => {
                console.error(`Error fetching books, ${err.message}`);
            });
    }, []);

    // Create the display for the books list
    const bookList =
        books.length === 0
            ? 'There are no books in the database!'
            : books.map((book, k) => <BookCard book={book} key={k}/>);

    // Return JSX
    return (
        <div className="ShowBookList">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <br/>
                        <h2 className="display-4 text-center">Books List</h2>
                    </div>

                    <div className="col-md-11">
                        <Link
                            to="/create-book"
                            className="btn btn-outline-warning float-right"
                        >
                            + Add New Book
                        </Link>
                        <br/>
                        <br/>
                        <hr/>
                    </div>
                </div>

                <div className="list">{bookList}</div>
            </div>
        </div>
    );
};

export default ShowBookList;