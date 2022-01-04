import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import "./index.css";
import App from "./App";

//Provider wrapes the enter app to send our state anywhere we want.
import { Provider } from 'react-redux'
//store comes from the store we created tha thas the root reducer and middleware.
import store from './redux/store'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,

  document.getElementById("root")
);
