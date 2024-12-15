import ReactDOM from "react-dom/client"
import App from "./App"
import store from "./store"
import React from "react"
import { Provider } from "react-redux"

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
)
