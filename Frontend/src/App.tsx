import Header from "./components/Header";
import { createBrowserRouter, RouterProvider } from "react-router-dom"

const router = createBrowserRouter([
  {
    path : '/',
    element: <Header />,
  }
]);

function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  )
}

export default App



// function App() {
//   return <div>
//     <Header />
//   </div>;
// }

// export default App;
