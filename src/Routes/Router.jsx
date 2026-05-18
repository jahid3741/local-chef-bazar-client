import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <div>Not Found</div>,
    children: [
      {
        index: true,
        element: <div>Index</div>,
      },
    ],
  },
]);
export default router;
