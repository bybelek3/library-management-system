import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/auth/login", {
                username,
                password,
            });

            localStorage.setItem("username", response.data.username);
            localStorage.setItem("role", response.data.role);

            setMessage("Login successful");
            navigate("/dashboard");
        } catch (error) {
            setMessage("Invalid username or password");
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: "450px" }}>
            <div className="card shadow p-4">
                <h2 className="text-center mb-4">Login</h2>

                {message && (
                    <div className="alert alert-info">
                        {message}
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button className="btn btn-primary w-100">
                        Login
                    </button>
                </form>

                <p className="text-center mt-3">
                    Don't have an account?
                </p>

                <Link to="/register" className="btn btn-outline-secondary w-100">
                    Register
                </Link>
            </div>
        </div>
    );
}

export default Login;