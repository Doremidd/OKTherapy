import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme.js";
import store from "../store.js";
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "../store.js";

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider theme={theme}>
          <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
              redirect_uri: `${window.location.origin}/home`,
            }}
          >
            <App />
          </Auth0Provider>
        </ChakraProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
