import App from "./app";
import ReactDOM from "react-dom/client";
import "./index.css";

async function enableMocking() {
  if (import.meta.env.DEV && import.meta.env.VITE_ENABLE_MSW === "true") {
    const { worker } = await import("./mocks/browser");
    await worker.start({
      onUnhandledRequest: "bypass",
    });
  }
}

enableMocking().then(() => {
  const root = ReactDOM.createRoot(document.getElementById("root")!);
  root.render(<App />);
});
