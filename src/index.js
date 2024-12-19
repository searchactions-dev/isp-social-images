import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Assuming your main component is in App.js
import "./index.css"; // Import the CSS file
import "./tailwind.css"; // Import Tailwind CSS

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
