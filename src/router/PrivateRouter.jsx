import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import ProductDetailsSkeleton from "../pages/skeletons/ProductDetailsSkeleton";
import CartSkeleton from "../pages/skeletons/CartSkeleton";
import OrderHistorySkeleton from "../pages/skeletons/OrderHistorySkeleton";
import ProfileSkeleton from "../pages/skeletons/ProfileSkeleton";
import WishlistSkeleton from "../pages/skeletons/WishlistSkeleton";


const PrivateRouter = ({ children }) => {
    const { userByEmail, loading } = useContext(AuthContext);
    const location = useLocation();

    // console.log(location.pathname.split('/')[1], location.pathname.split('/')[2]);

    if (userByEmail.userEmail) {
        return children;
    }
    else if (loading) {
        return (
            <>
                {
                    (location.pathname.split('/')[1] === 'product-details' || location.pathname.split('/')[2] === 'product-details')
                    && <ProductDetailsSkeleton />
                }

                {
                    (location.pathname.split('/')[1] === 'cart' || location.pathname.split('/')[2] === 'cart')
                    && <CartSkeleton />
                }

                {
                    (location.pathname.split('/')[1] === 'order-history' || location.pathname.split('/')[2] === 'order-history')
                    && <OrderHistorySkeleton />
                }

                {
                    (location.pathname.split('/')[1] === 'profile' || location.pathname.split('/')[2] === 'profile')
                    && <ProfileSkeleton />
                }

                {
                    (location.pathname.split('/')[1] === 'wishlist' || location.pathname.split('/')[2] === 'wishlist')
                    && <WishlistSkeleton />
                }

                {/* <div className=" flex justify-center dark:text-white"><span className="loading loading-bars loading-lg"></span></div> */}
            </>
        )
    }
    else {
        return <Navigate state={location.pathname} to={'/sign-in'}></Navigate>
    }
};

export default PrivateRouter;