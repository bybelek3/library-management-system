import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Dashboard() {
    const username = localStorage.getItem("username");

    const [bookCount, setBookCount] = useState(0);
    const [loanCount, setLoanCount] = useState(0);
    const [activeLoanCount, setActiveLoanCount] = useState(0);
    const [availableCopies, setAvailableCopies] = useState(0);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        const booksResponse = await api.get("/books");
        const loansResponse = await api.get("/loans");

        const books = booksResponse.data;
        const loans = loansResponse.data;

        setBookCount(books.length);
        setLoanCount(loans.length);
        setActiveLoanCount(loans.filter((loan) => loan.returnDate === null).length);

        const totalCopies = books.reduce(
            (sum, book) => sum + Number(book.availableCopies || 0),
            0
        );

        setAvailableCopies(totalCopies);
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-3">Dashboard</h1>
            <p className="lead">Welcome, {username || "user"}.</p>

            <div className="row mt-4">
                <div className="col-md-3 mb-3">
                    <div className="card shadow p-4 text-center">
                        <h2>📚</h2>
                        <h4>Total Books</h4>
                        <h2>{bookCount}</h2>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="card shadow p-4 text-center">
                        <h2>📖</h2>
                        <h4>Total Loans</h4>
                        <h2>{loanCount}</h2>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="card shadow p-4 text-center">
                        <h2>⏳</h2>
                        <h4>Active Loans</h4>
                        <h2>{activeLoanCount}</h2>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="card shadow p-4 text-center">
                        <h2>✅</h2>
                        <h4>Available Copies</h4>
                        <h2>{availableCopies}</h2>
                    </div>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-md-6 mb-3">
                    <div className="card shadow p-4">
                        <h3>Books</h3>
                        <p>View, add, update, delete, and borrow books.</p>
                        <Link to="/books" className="btn btn-primary">
                            Go to Books
                        </Link>
                    </div>
                </div>

                <div className="col-md-6 mb-3">
                    <div className="card shadow p-4">
                        <h3>Loans</h3>
                        <p>View borrowed books and return them.</p>
                        <Link to="/loans" className="btn btn-success">
                            Go to Loans
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;