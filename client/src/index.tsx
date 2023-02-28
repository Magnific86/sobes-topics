import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import { MyLayout } from "./layout/MyLayout";
import { App } from "./App";
import { MainProvider } from "./context/MyContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <MainProvider>
    <MyLayout>
      <App />
    </MyLayout>
  </MainProvider>
  // </React.StrictMode>
);
