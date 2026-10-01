import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { LanguageProvider } from "./context/LanguageContext.jsx";
import { A11yProvider } from "./context/A11yContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LanguageProvider>
      <A11yProvider>
        <App />
      </A11yProvider>
    </LanguageProvider>
  </StrictMode>
);
