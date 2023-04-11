import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app/App";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as RouterProvider } from "react-router-dom";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { productsApi } from "./api/productsApi";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ApiProvider api={productsApi}>
      <RouterProvider>
        <App />
        <ToastContainer />
      </RouterProvider>
    </ApiProvider>
  </React.StrictMode>
);

reportWebVitals();
