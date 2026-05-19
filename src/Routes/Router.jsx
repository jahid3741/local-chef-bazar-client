import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Login from "../Auth/Login/Login";
import Register from "../Auth/Register/Register";
import Meals from "../Pages/Meals/Meals";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import MealDetails from "../Pages/MealDetails/MealDetails";
import OrderPage from "../Pages/OrderPage/OrderPage";
import MyOrders from "../Pages/Dashboard/MyOrders/MyOrders";
import DashboardLayout from "../Layouts/DashboardLayout/Dashboardlayout";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";
import MyReview from "../Pages/Dashboard/MyReview/MyReview";
import FavoriteMeals from "../Pages/Dashboard/MyFavorite/FavoriteMeals";
import CreateMeal from "../Pages/Dashboard/CreateMeal/CreateMeal";
import MyMeals from "../Pages/Dashboard/MyMeals/MyMeals";

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
      {
        path: "order/:id",
        element: (
          <PrivateRoute>
            <OrderPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/my-orders",
        element: <MyOrders />,
      },
      {
        path: "/dashboard/my-profile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "/dashboard/my-reviews",
        element: <MyReview></MyReview>,
      },
      {
        path: "/dashboard/favorites",
        element: <FavoriteMeals></FavoriteMeals>,
      },
      {
        path: "create-meal",
        element: <CreateMeal />,
      },
      {
        path: "my-meals",
        element: <MyMeals />,
      },
    ],
  },
]);

export default router;
