import { useEffect, useState } from "react";
import api from "../services/api";

function Books() {
    const isLoggedIn = localStorage.getItem("username") !== null;
    const role = localStorage.getItem("role");

    const isReader = role === "READER";
    const isLibrarian = role === "LIBRARIAN";

    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState("");
    const [form, setForm] = useState({
        isbn: "",
        title: "",
        author: "",
        publisher: "",
        yearPublished: "",
        availableCopies: ""
    });
    const [editingId, setEditingId] = useState(null);
    const [message, setMessage] = useState("");

    const loadBooks = async () => {
        const response = await api.get("/books");
        setBooks(response.data);
    };

    useEffect(() => {
        loadBooks();
    }, []);

    const filteredBooks = books.filter((book) => {
        const keyword = search.toLowerCase();

        return (
            book.title?.toLowerCase().includes(keyword) ||
            book.author?.toLowerCase().includes(keyword) ||
            book.publisher?.toLowerCase().includes(keyword) ||
            book.isbn?.toLowerCase().includes(keyword)
        );
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const resetForm = () => {
        setForm({
            isbn: "",
            title: "",
            author: "",
            publisher: "",
            yearPublished: "",
            availableCopies: ""
        });
        setEditingId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const bookData = {
            ...form,
            yearPublished: Number(form.yearPublished),
            availableCopies: Number(form.availableCopies)
        };

        if (editingId) {
            await api.put(`/books/${editingId}`, bookData);
            setMessage("Book updated successfully");
        } else {
            await api.post("/books", bookData);
            setMessage("Book added successfully");
        }

        resetForm();
        loadBooks();
    };

    const handleEdit = (book) => {
        setEditingId(book.id);
        setForm({
            isbn: book.isbn || "",
            title: book.title || "",
            author: book.author || "",
            publisher: book.publisher || "",
            yearPublished: book.yearPublished || "",
            availableCopies: book.availableCopies || ""
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this book?")) {
            await api.delete(`/books/${id}`);
            setMessage("Book deleted successfully");
            loadBooks();
        }
    };

    const handleBorrow = async (bookId) => {
        const userId = 1;

        try {
            await api.post(`/loans/borrow?userId=${userId}&bookId=${bookId}`);
            setMessage("Book borrowed successfully");
            loadBooks();
        } catch (error) {
            setMessage("Could not borrow this book");
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Books</h1>

            {!isLoggedIn && (
                <div className="alert alert-warning">
                    You are browsing as a guest. Please login to borrow books or manage the library.
                </div>
            )}

            {isLoggedIn && isReader && (
                <div className="alert alert-info">
                    You are logged in as READER. You can borrow books, but you cannot add, edit, or delete books.
                </div>
            )}

            {isLoggedIn && isLibrarian && (
                <div className="alert alert-success">
                    You are logged in as LIBRARIAN. You can manage the book inventory.
                </div>
            )}

            {message && (
                <div className="alert alert-info">
                    {message}
                </div>
            )}

            {isLibrarian && (
                <div className="card shadow p-4 mb-4">
                    <h4>{editingId ? "Edit Book" : "Add New Book"}</h4>

                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <input
                                    className="form-control"
                                    name="isbn"
                                    placeholder="ISBN"
                                    value={form.isbn}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-4 mb-3">
                                <input
                                    className="form-control"
                                    name="title"
                                    placeholder="Title"
                                    value={form.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-4 mb-3">
                                <input
                                    className="form-control"
                                    name="author"
                                    placeholder="Author"
                                    value={form.author}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-4 mb-3">
                                <input
                                    className="form-control"
                                    name="publisher"
                                    placeholder="Publisher"
                                    value={form.publisher}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-4 mb-3">
                                <input
                                    type="number"
                                    className="form-control"
                                    name="yearPublished"
                                    placeholder="Year"
                                    value={form.yearPublished}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-4 mb-3">
                                <input
                                    type="number"
                                    className="form-control"
                                    name="availableCopies"
                                    placeholder="Available Copies"
                                    value={form.availableCopies}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <button className="btn btn-primary me-2">
                            {editingId ? "Update Book" : "Add Book"}
                        </button>

                        {editingId && (
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={resetForm}
                            >
                                Cancel
                            </button>
                        )}
                    </form>
                </div>
            )}

            <div className="card shadow p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="mb-0">Book List</h4>

                    <input
                        className="form-control"
                        style={{ maxWidth: "350px" }}
                        placeholder="Search by title, author, publisher or ISBN..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <p className="text-secondary">
                    Showing {filteredBooks.length} of {books.length} books
                </p>

                <div className="table-responsive">
                    <table className="table table-striped table-hover mt-3">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>ISBN</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Publisher</th>
                            <th>Year</th>
                            <th>Copies</th>
                            {(isReader || isLibrarian) && <th>Actions</th>}
                        </tr>
                        </thead>

                        <tbody>
                        {filteredBooks.map((book) => (
                            <tr key={book.id}>
                                <td>{book.id}</td>
                                <td>{book.isbn}</td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.publisher}</td>
                                <td>{book.yearPublished}</td>
                                <td>{book.availableCopies}</td>

                                {(isReader || isLibrarian) && (
                                    <td>
                                        {isLibrarian && (
                                            <>
                                                <button
                                                    className="btn btn-sm btn-warning me-2"
                                                    onClick={() => handleEdit(book)}
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="btn btn-sm btn-danger me-2"
                                                    onClick={() => handleDelete(book.id)}
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        )}

                                        <button
                                            className="btn btn-sm btn-success"
                                            onClick={() => handleBorrow(book.id)}
                                            disabled={book.availableCopies <= 0}
                                        >
                                            Borrow
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    {filteredBooks.length === 0 && (
                        <div className="text-center p-4">
                            No books found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Books;