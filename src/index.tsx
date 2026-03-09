import App from "./app";
import store from "./store";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
