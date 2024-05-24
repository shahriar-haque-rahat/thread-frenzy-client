import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/Root";
import Error from "../pages/Error";
import Home from "../pages/home/Home";


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
            ],
        }
    ]
)

export default Router;