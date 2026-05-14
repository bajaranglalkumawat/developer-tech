import { hydrateRoot, createRoot } from "react-dom/client";
import { App } from "./App";
import "react-quill/dist/quill.snow.css";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root container not found");
}

if (container.hasChildNodes()) {
  hydrateRoot(container, <App />);
} else {
  createRoot(container).render(<App />);
}
