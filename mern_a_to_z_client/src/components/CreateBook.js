import React, {useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {set} from "mongoose";

const CreateBook = (props) => {
    // Define the state with the useState hook
    const navigate = useNavigate();
    const [book, setBook] = useState({
        // Book details as an object
        title: '',
        isbn: '',
        author: '',
        description: '',
        publish_date: '',
        publisher: ''
    });

    /**
     * On Change Handler
     * @param e
     */
    const onChange = (e) => {
        setBook({...book, [e.target.name]: e.target.value});
    };

    /**
     * On Submit Handler
     * @param e
     */
    const onSubmit = (e) => {
        e.preventDefault(); // Prevent the form from submitting

        axios
            .post('http://localhost:8082/api/books', book)
            .then((res) => {
                // Reset the form
                setBook({
                    title: '',
                    isbn: '',
                    author: '',
                    description: '',
                    published_date: '',
                    publisher: '',
                });
                console.log(res.data);

                // Redirect to index
                navigate('/');
            })
            .catch((err) => {
                console.error(`Error adding Book, ${err.message}`);
            });
    };
    // JSX for the Create Book form
    return (
        <div className='CreateBook'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-8 m-auto'>
                        <br />
                        <Link to='/' className='btn btn-outline-warning float-left'>
                            Show Book List
                        </Link>
                    </div>
                    <div className='col-md-8 m-auto'>
                        <h1 className='display-4 text-center'>Add Book</h1>
                        <p className='lead text-center'>Create new book</p>

                        <form noValidate onSubmit={onSubmit}>
                            <div className='form-group'>
                                <input
                                    type='text'
                                    placeholder='Title of the Book'
                                    name='title'
                                    className='form-control'
                                    value={book.title}
                                    onChange={onChange}
                                />
                            </div>
                            <br />

                            <div className='form-group'>
                                <input
                                    type='text'
                                    placeholder='ISBN'
                                    name='isbn'
                                    className='form-control'
                                    value={book.isbn}
                                    onChange={onChange}
                                />
                            </div>

                            <div className='form-group'>
                                <input
                                    type='text'
                                    placeholder='Author'
                                    name='author'
                                    className='form-control'
                                    value={book.author}
                                    onChange={onChange}
                                />
                            </div>

                            <div className='form-group'>
                                <input
                                    type='text'
                                    placeholder='Describe this book'
                                    name='description'
                                    className='form-control'
                                    value={book.description}
                                    onChange={onChange}
                                />
                            </div>

                            <div className='form-group'>
                                <input
                                    type='date'
                                    placeholder='published_date'
                                    name='published_date'
                                    className='form-control'
                                    value={book.published_date}
                                    onChange={onChange}
                                />
                            </div>
                            <div className='form-group'>
                                <input
                                    type='text'
                                    placeholder='Publisher of this Book'
                                    name='publisher'
                                    className='form-control'
                                    value={book.publisher}
                                    onChange={onChange}
                                />
                            </div>

                            <input
                                type='submit'
                                className='btn btn-outline-warning btn-block mt-4'
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateBook;