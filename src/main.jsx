import React from "react";
import "./global.css"
import ReactDOM from "react-dom/client";
import App from "./App"; // Ensure your main component is correctly imported

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
