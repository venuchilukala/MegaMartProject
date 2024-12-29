import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Store from "../pages/shop/Store";


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
        }
    ]
    },
]); 

export default router;