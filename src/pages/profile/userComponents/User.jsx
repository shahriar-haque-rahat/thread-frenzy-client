import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Account from "./Account";
import { useDispatch, useSelector } from "react-redux";
import Wishlist from "./Wishlist";
import OrderHistory from "./OrderHistory";
import { getCart } from "../../../redux/cartSlice";


const User = ({ userByEmail }) => {
    const dispatch = useDispatch();
    const { cartItems, cartStatus, cartError } = useSelector(state => state.cart);
    const [isActive, setIsActive] = useState('account');


    useEffect(() => {
        if (cartStatus === 'idle' && userByEmail.userEmail) {
            dispatch(getCart(userByEmail.userEmail));
        }
    }, [dispatch, cartStatus, userByEmail]);

    if (cartStatus === 'failed') {
        return <div>Error: {cartError}</div>;
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