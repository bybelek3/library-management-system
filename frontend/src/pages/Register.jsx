import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        password: "",
        email: "",
        name: "",
        role: "READER"
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await api.post("/auth/register", form);
            setMessage("Registration successful. Redirecting to login...");

            setTimeout(() => {
                navigate("/");
            }, 1000);
        } catch (error) {
            setMessage("Registration failed. Username or email may already exist.");
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: "500px" }}>
            <div className="card shadow p-4">
                <h2 className="text-center mb-4">Register</h2>

                {message && (
                    <div className="alert alert-info">
                        {message}
                    </div>
                )}

                <form onSubmit={handleRegister}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            name="username"
                            className="form-control"
                            placeholder="Username"
                            value={form.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            name="password"
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            name="email"
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Full Name</label>
                        <input
                            name="name"
                            className="form-control"
                            placeholder="Full Name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Role</label>
                        <select
                            name="role"
                            className="form-select"
                            value={form.role}
                            onChange={handleChange}
                        >
                            <option value="READER">Reader</option>
                            <option value="LIBRARIAN">Librarian</option>
                        </select>
                    </div>

                    <button className="btn btn-success w-100">
                        Register
                    </button>
                </form>

                <Link to="/" className="btn btn-outline-secondary w-100 mt-3">
                    Back to Login
                </Link>
            </div>
        </div>
    );
}

export default Register;