import { useEffect, useState } from "react";
import api from "../services/api";

function Loans() {
    const [loans, setLoans] = useState([]);
    const [message, setMessage] = useState("");

    const loadLoans = async () => {
        try {
            const response = await api.get("/loans");
            setLoans(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        loadLoans();
    }, []);

    const returnBook = async (loanId) => {
        try {
            await api.put(`/loans/return/${loanId}`);
            setMessage("Book returned successfully.");
            loadLoans();
        } catch (err) {
            setMessage("Could not return the book.");
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Borrowed Books</h1>

            {message && (
                <div className="alert alert-info">
                    {message}
                </div>
            )}

            <div className="card shadow p-4">
                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead>
                        <tr>
                            <th>Loan ID</th>
                            <th>Book</th>
                            <th>User</th>
                            <th>Loan Date</th>
                            <th>Due Date</th>
                            <th>Return Date</th>
                            <th>Action</th>
                        </tr>
                        </thead>

                        <tbody>
                        {loans.map((loan) => (
                            <tr key={loan.id}>
                                <td>{loan.id}</td>
                                <td>{loan.book.title}</td>
                                <td>{loan.user.username}</td>
                                <td>{loan.loanDate}</td>
                                <td>{loan.dueDate}</td>
                                <td>
                                    {loan.returnDate ? loan.returnDate : "-"}
                                </td>
                                <td>
                                    {!loan.returnDate ? (
                                        <button
                                            className="btn btn-success btn-sm"
                                            onClick={() => returnBook(loan.id)}
                                        >
                                            Return
                                        </button>
                                    ) : (
                                        <span className="badge bg-secondary">
                                                Returned
                                            </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    {loans.length === 0 && (
                        <div className="text-center mt-3">
                            <h5>No borrowed books.</h5>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Loans;