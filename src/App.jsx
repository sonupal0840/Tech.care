import React from "react";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Content1 from "./components/Content";
import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                {/* Default: Always show Login on load */}
                <Route path="/" element={<Login />} />
                {/* Other pages */}
                <Route path="/content" element={<Content1 />} />
                {/* Redirect any unknown route to Login */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default App;

