import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import Account from "./Account";
import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import { useDispatch, useSelector } from "react-redux";
import { getUserByEmail } from "../../../redux/userSlice";
import Wishlist from "./Wishlist";
import OrderHistory from "./OrderHistory";
import { getCart } from "../../../redux/cartSlice";


const User = () => {
    const { user } = useContext(AuthContext);
    const dispatch = useDispatch();
    const { userByEmail, userByEmailstatus, userByEmailError } = useSelector(state => state.user);
    const { cartItems, cartStatus, cartError } = useSelector(state => state.cart);
    const [isActive, setIsActive] = useState('account');


    useEffect(() => {
        if (user) {
            dispatch(getUserByEmail(user?.email))
            dispatch(getCart(user?.email))
        }
    }, [dispatch, user])

    if (userByEmailstatus === 'loading' || cartStatus === 'loading') {
        return <div>Loading...</div>;
    }

    if (userByEmailstatus === 'failed' || cartStatus === 'failed') {
        return <div>Error: {userByEmailError} || {cartError}</div>;
    }

    return (
        <div className=" max-w-[1440px] mx-auto flex gap-6">
            <Sidebar userByEmail={userByEmail} isActive={isActive} setIsActive={setIsActive}></Sidebar>
            <div className=" w-[75%]">
                {
                    (isActive === 'account') && <Account userByEmail={userByEmail}></Account>
                }
                {
                    (isActive === 'wishlist') && <Wishlist userId={userByEmail._id}></Wishlist>
                }
                {
                    (isActive === 'orders') && <OrderHistory cartItems={cartItems}></OrderHistory>
                }
            </div>
        </div>
    );
};

export default User;