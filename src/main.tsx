import ReactDOM from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root")!;

if (!rootElement.innerHTML) {
  ReactDOM.createRoot(rootElement).render(<App />);
}