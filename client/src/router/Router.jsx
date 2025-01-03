import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Store from "../pages/shop/Store";
import Cards from "../components/Cards";
import StoreItems from "../pages/shop/StoreItems";
import Signup from "../components/Signup";
import PrivateRouter from "../privaterouter/PrivateRouter";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import CartPage from "../pages/shop/CartPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/store",
        element: <Store />,
      },
      {
        path: "/store/:id",
        element: <StoreItems />,
      },
      {
        path : "/cart-page",
        element : <CartPage/>
      },
      {
        path: "/update-profile",
        element: <UpdateProfile />,
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "*",
    element: <div>404 - Page Not Found</div>,
  },
]);

export default router;
