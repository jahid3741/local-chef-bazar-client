import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Login from "../Auth/Login/Login";
import Register from "../Auth/Register/Register";
import Meals from "../Pages/Meals/Meals";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import MealDetails from "../Pages/MealDetails/MealDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <div>Not Found</div>,

    children: [
      {
        index: true,
        element: <div>Home Page</div>,
      },

      {
        path: "login",
        element: <Login />,
      },

      {
        path: "register",
        element: <Register />,
      },
      {
        path: "meals",
        element: <Meals />,
      },
      {
        path: "meals/:id",
        element: (
          <PrivateRoute>
            <MealDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
