import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");

    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        document.documentElement.setAttribute(
            "data-theme",
            darkMode ? "dark" : "light"
        );

        localStorage.setItem("theme", darkMode ? "dark" : "light");
    }, [darkMode]);

    const logout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        navigate("/");
        window.location.reload();
    };

    const isAuthPage = location.pathname === "/" || location.pathname === "/register";

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand fw-bold" to={username ? "/dashboard" : "/books"}>
                    📚 Library
                </Link>

                <div className="navbar-nav ms-auto">
                    {username && !isAuthPage ? (
                        <>
                            <Link className="nav-link" to="/dashboard">Dashboard</Link>
                            <Link className="nav-link" to="/books">Books</Link>
                            <Link className="nav-link" to="/loans">Loans</Link>
                            <Link className="nav-link" to="/about">About</Link>

                            <button
                                className="btn btn-outline-light btn-sm ms-3"
                                onClick={() => setDarkMode(!darkMode)}
                            >
                                {darkMode ? "☀ Light" : "🌙 Dark"}
                            </button>

                            <span className="navbar-text text-white ms-3">
                                {username} {role && `(${role})`}
                            </span>

                            <button
                                className="btn btn-danger btn-sm ms-3"
                                onClick={logout}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link className="nav-link" to="/books">Books</Link>
                            <Link className="nav-link" to="/">Login</Link>
                            <Link className="nav-link" to="/register">Register</Link>

                            <button
                                className="btn btn-outline-light btn-sm ms-3"
                                onClick={() => setDarkMode(!darkMode)}
                            >
                                {darkMode ? "☀ Light" : "🌙 Dark"}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;