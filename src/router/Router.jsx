import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/Root";
import Error from "../pages/Error";
import Home from "../pages/home/Home";
import Men from "../pages/products/Men";
import Women from "../pages/products/Women";


const Router = createBrowserRouter (
    [
        {
            path:'/',
            element:<Root></Root>,
            errorElement:<Error></Error>,
            children:[
                {
                    path:'/',
                    element:<Home></Home>
                },
                {
                    path:'/men',
                    element:<Men></Men>
                },
                {
                    path:'/women',
                    element:<Women></Women>
                },
            ],
        }
    ]
)

export default Router;