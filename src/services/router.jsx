import LandingPage from "../pages/Homepage/LandingPage/LandingPage.jsx";
import LogIn from "../pages/Authentication/PageLogIn/LogIn.jsx";
import MyAlbum from "../pages/MyAlbum/MyAlbum.jsx";
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
  {
    path: "/album",
    element: <MyAlbum />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
