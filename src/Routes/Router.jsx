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
  // ALL PAGES NOW LIVE HERE (They will all have your Navbar and Footer)
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "meals", element: <Meals /> },
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
        path: "payment/:id",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
      // --- DASHBOARD PAGES MOVED HERE ---
      {
        path: "my-profile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "my-orders",
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
      {
        path: "my-reviews",
        element: (
          <PrivateRoute>
            <MyReview />
          </PrivateRoute>
        ),
      },
      {
        path: "favorites",
        element: (
          <PrivateRoute>
            <FavoriteMeals />
          </PrivateRoute>
        ),
      },
      {
        path: "create-meal",
        element: (
          <PrivateRoute>
            <CreateMeal />
          </PrivateRoute>
        ),
      },
      {
        path: "my-meals",
        element: (
          <PrivateRoute>
            <MyMeals />
          </PrivateRoute>
        ),
      },
      {
        path: "order-requests",
        element: (
          <PrivateRoute>
            <OrderRequests />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <ManageUsers />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-requests",
        element: (
          <PrivateRoute>
            <ManageRequests />
          </PrivateRoute>
        ),
      },
      {
        path: "platform-statistics",
        element: (
          <PrivateRoute>
            <PlatformStatistics />
          </PrivateRoute>
        ),
      },
      {
        path: "payment-success",
        element: (
          <PrivateRoute>
            <PaymentSuccess />
          </PrivateRoute>
        ),
      },
    ],
  },

  // THE DASHBOARD HUB (Sidebar Menu Only)
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
  },
]);

export default router;
