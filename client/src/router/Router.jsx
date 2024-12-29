import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Store from "../pages/shop/Store";
import Cards from "../components/Cards";
import StoreItems from "../pages/shop/StoreItems";


const router = createBrowserRouter([
    {
    path: "/",
    element: <Main/>,
    children : [
        {
            path : "/",
            element :<Home/>
        },
        {
            path : "/store",
            element : <Store/>
        },
        {
            path : "/store/:id",
            element : <StoreItems/>
        }
    ]
    },
]); 

export default router;