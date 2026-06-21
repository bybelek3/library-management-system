import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="container mt-5 text-center">
            <div className="card shadow p-5">
                <h1 className="display-1">404</h1>
                <h2>Page Not Found</h2>
                <p className="mt-3">The page you are looking for does not exist.</p>

                <Link to="/dashboard" className="btn btn-primary mt-3">
                    Go Home
                </Link>
            </div>
        </div>
    );
}

export default NotFound;