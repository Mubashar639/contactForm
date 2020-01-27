import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {store} from "./redux/store"

// persistor

ReactDOM.render(
  <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor} > */}
      <App />
    {/* </PersistGate> */}
  </Provider>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept();
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();