import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import App from "./App.tsx";
import { SketchProvider } from "./context/SketchProvider.tsx";
// import  AuthProvider  from "./context/Authprovider.tsx";
// Ensure the root element exists and initialize the app
const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

root.render(
  <AuthProvider>
    <SketchProvider>
      <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StrictMode>
    </SketchProvider>
  </AuthProvider>
);
