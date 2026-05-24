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
import OrderRequests from "../Pages/Dashboard/OrderRequests/OrderRequests";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import ManageRequests from "../Pages/Dashboard/ManageRequests/ManageRequests";
import PlatformStatistics from "../Pages/Dashboard/PlatformStatistics/PlatformStatistics";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Components/Home/Home";
import Payment from "../Pages/Payment/Payment";
import PaymentSuccess from "../Pages/Payment/PaymentSuccess";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage></ErrorPage>,

    children: [
      {
        index: true,
        element: <Home></Home>,
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
        path: "/dashboard/create-meal",
        element: <CreateMeal />,
      },
      {
        path: "/dashboard/my-meals",
        element: <MyMeals />,
      },
      {
        path: "/dashboard/order-requests",
        element: <OrderRequests />,
      },
      {
        path: "/dashboard/manage-users",
        element: <ManageUsers />,
      },

      {
        path: "/dashboard/manage-requests",
        element: <ManageRequests />,
      },

      {
        path: "/dashboard/platform-statistics",
        element: <PlatformStatistics />,
      },
      {
        path: "payment/:id",
        element: <Payment />,
      },
      {
        path: "payment-success",
        element: <PaymentSuccess />,
      },
    ],
  },
]);

export default router;
