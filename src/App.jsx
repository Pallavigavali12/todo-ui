import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/login";
import Home from "./components/home";
import { ToastContainer } from "react-toastify";
import Register from "./components/register";
import AuthWrapper from "./components/authwrapper";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <AuthWrapper>
          <Home></Home>
        </AuthWrapper>
      ),
    },
    {
      path: "/login",
      element: <Login></Login>,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
