import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./app/store";

const root = createRoot(document.getElementById("root")!);

root.render(
  <Provider store={store}>
    <style>
      @import
      url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,200;0,300;0,400;0,500;0,600;1,200;1,300;1,400;1,500;1,600&display=swap');
    </style>
    <App />
  </Provider>
);
