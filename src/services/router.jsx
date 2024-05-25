import LandingPage from "../pages/Homepage/LandingPage/LandingPage.jsx";
import LogIn from "../pages/Authentication/PageLogIn/LogIn.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import * as ReactDOM from "react-dom";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LogIn />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
