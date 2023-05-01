import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import "./styles/index.scss"
import { MyLayout } from "./layout/MyLayout"
import { App } from "./App"
import { MainProvider } from "./context/MyContext"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <StrictMode>
    <MainProvider>
      <MyLayout>
        <App />
        <ToastContainer newestOnTop />
      </MyLayout>
    </MainProvider>
  </StrictMode>
)
