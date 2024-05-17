import ReactDOM from "react-dom/client";
import LandingPage from "./pages/Homepage/LandingPage/LandingPage.jsx";
import LogIn from "./pages/Authentication/PageLogIn/LogIn.jsx";
import SignUp from "./pages/Authentication/PageSignUp/SignUp.jsx";
import ForgotPassword from "./pages/Authentication/PageForgotPassword/ForgotPassword.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./shared/App.css";
import MapPage from "./pages/Map/MapPage.jsx";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    path: "/forgotPwd",
    element: <ForgotPassword />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
  {
    path: "/map",
    element: <MapPage />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
