import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

import { MemberProvider } from "./context/MemberContext";
import { SessionProvider } from "./context/SessionContext";
import { ClassProvider } from "./context/ClassContext";
import { StoreProvider } from "./context/StoreContext.jsx";
import { ToastProvider } from "./context/ToastContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastProvider>
      <StoreProvider>
        <MemberProvider>
          <SessionProvider>
            <ClassProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </ClassProvider>
          </SessionProvider>
        </MemberProvider>
      </StoreProvider>
    </ToastProvider>
  </React.StrictMode>
);
