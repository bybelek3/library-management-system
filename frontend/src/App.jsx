import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import Loans from "./pages/Loans";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route path="/books" element={<Books />} />

                <Route
                    path="/loans"
                    element={
                        <ProtectedRoute>
                            <Loans />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/about"
                    element={
                        <ProtectedRoute>
                            <About />
                        </ProtectedRoute>
                    }
                />

                <Route path="*" element={<NotFound />} />
            </Routes>

            <div className="footer">
                Library Management System © 2026
            </div>
        </BrowserRouter>
    );
}

export default App;