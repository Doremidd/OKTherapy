import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme.js";
import store from "../store.js";
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Auth0Provider domain={domain} clientId={clientId}>
          <App />
        </Auth0Provider>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
