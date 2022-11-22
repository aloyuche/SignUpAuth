import React from "react";
// import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import App from "./App";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import { AuthProvide } from "./context/AuthProvide";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvide>
        <Routes>
          <Route path="/*" element={App} />
        </Routes>
      </AuthProvide>
    </BrowserRouter>
  </React.StrictMode>
);
