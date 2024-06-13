import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import SalesOverviewSkeleton from "../pages/skeletons/SalesOverviewSkeleton";
import ManageOrdersSkeleton from "../pages/skeletons/ManageOrdersSkeleton";
import ManageProductsSkeleton from "../pages/skeletons/ManageProductsSkeleton";
import ManageUsersSkeleton from "../pages/skeletons/ManageUsersSkeleton";


const AdminRouter = ({ children }) => {
    const { userByEmail, loading } = useContext(AuthContext);
    const location = useLocation();

    if (userByEmail?.role === 'admin') {
        return children;
    }
    else if (loading) {
        return (
            <>

                {
                    (location.pathname.split('/')[1] === 'sales-overview' || location.pathname.split('/')[2] === 'sales-overview')
                    && <SalesOverviewSkeleton />
                }

                {
                    (location.pathname.split('/')[1] === 'manage-orders' || location.pathname.split('/')[2] === 'manage-orders')
                    && <ManageOrdersSkeleton />
                }

                {
                    (location.pathname.split('/')[1] === 'manage-products' || location.pathname.split('/')[2] === 'manage-products')
                    && <ManageProductsSkeleton />
                }

                {
                    (location.pathname.split('/')[1] === 'manage-users' || location.pathname.split('/')[2] === 'manage-users')
                    && <ManageUsersSkeleton />
                }

                {/* <div className=" flex justify-center dark:text-white"><span className="loading loading-bars loading-lg"></span></div> */}
            </>
        )
    }
    else {
        return <Navigate state={location.pathname} to={'/sign-in'}></Navigate>
    }
};

export default AdminRouter;