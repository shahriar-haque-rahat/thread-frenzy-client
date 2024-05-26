import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../provider/AuthProvider";
import { getCart } from "../../redux/cartSlice";



const Cart = () => {
    const { user } = useContext(AuthContext);
    const dispatch = useDispatch();
    const { cartItems, cartStatus, cartError } = useSelector(state => state.cart);


    useEffect(() => {
        dispatch(getCart(user?.email));
    }, [dispatch, user]);

    if (cartStatus === 'loading') {
        return <div>Loading...</div>;
    }

    if (cartStatus === 'failed') {
        return <div>Error: {cartError}</div>;
    }

    return (
        <div>
            {cartItems.length}
        </div>
    );
};

export default Cart;