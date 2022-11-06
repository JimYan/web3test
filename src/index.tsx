import { StrictMode } from "react";
import * as ReactDOMClient from "react-dom/client";

import App from "./App";
import AuthContextProvider from "./store/auth";

const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement);

root.render(
  <StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </StrictMode>
);
