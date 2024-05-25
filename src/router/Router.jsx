import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/Root";
import Error from "../pages/Error";
import Home from "../pages/home/Home";
import Men from "../pages/products/Men";
import Women from "../pages/products/Women";
import ProductDetails from "../pages/products/ProductDetails";
import SignIn from "../pages/loginRegister/SignIn";
import SignUp from "../pages/loginRegister/SignUp";
import User from "../pages/profile/User";
import Admin from "../pages/profile/Admin";


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
                {
                    path:'/product-details/:itemId',
                    element:<ProductDetails></ProductDetails>
                },
                {
                    path:'/sign-in',
                    element:<SignIn></SignIn>
                },
                {
                    path:'/sign-up',
                    element:<SignUp></SignUp>
                },
                {
                    path:'/profile',
                    element:<User></User>
                },
                {
                    path:'/admin-profile',
                    element:<Admin></Admin>
                },
            ],
        }
    ]
)

export default Router;