import { RouterProvider } from "react-router-dom";
import router from "@/routes/AppRoutes"
import { Modal } from "./components/modal";

function App() {
  return (
    <>
    <RouterProvider  router={router}/> 
    <Modal />
    </>
  )
}

export default App;
