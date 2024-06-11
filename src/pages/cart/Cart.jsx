import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../provider/AuthProvider";
import { getCart, updateCartItem, deleteCartItem } from "../../redux/cartSlice";
import CartItem from "./CartItem";
import CheckOut from "./CheckOut";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

const MySwal = withReactContent(Swal);

const Cart = () => {
    const dispatch = useDispatch();
    const { user } = useContext(AuthContext);
    const { cartItems, cartStatus, cartError } = useSelector(state => state.cart);
    const [quantities, setQuantities] = useState({});
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    const handleQuantity = (id, operation) => {
        setQuantities(prevQuantities => {
            const newQuantity = operation === "+" ? prevQuantities[id] + 1 : prevQuantities[id] - 1;
            const updatedQuantity = newQuantity < 1 ? 1 : newQuantity;

            dispatch(updateCartItem({ id, quantity: updatedQuantity }))
                .unwrap()
                .then(() => {
                    dispatch(getCart(user.email));
                })
                .catch(error => {
                    console.error('Update operation failed:', error);
                });

            return {
                ...prevQuantities,
                [id]: updatedQuantity
            };
        });
    };

    const handleDeleteCartItem = (id) => {
        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            customClass: {
                popup: 'square',
                confirmButton: 'square',
                cancelButton: 'square',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteCartItem(id))
                    .unwrap()
                    .then(() => {
                        dispatch(getCart(user.email));
                        return MySwal.fire({
                            title: 'Product Deleted',
                            icon: 'success',
                            confirmButtonColor: 'black',
                            customClass: {
                                popup: 'square',
                                confirmButton: 'square'
                            }
                        });
                    })
                    .catch(error => {
                        console.error('Delete operation failed:', error);
                        MySwal.fire({
                            title: 'Error!',
                            text: 'Failed to delete the product. Please try again.',
                            icon: 'error',
                            confirmButtonColor: 'black',
                            customClass: {
                                popup: 'square',
                                confirmButton: 'square'
                            }
                        });
                    });
            }
        });
    };

    useEffect(() => {
        if (user?.email) {
            dispatch(getCart(user.email));
        }
    }, [dispatch, user]);

    useEffect(() => {
        if (cartItems) {
            const initialQuantities = cartItems.reduce((acc, item) => {
                acc[item._id] = item.quantity;
                return acc;
            }, {});
            setQuantities(initialQuantities);
        }
    }, [cartItems, setQuantities]);

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * (quantities[item._id] || 1), 0).toFixed(2);
    const amountToPay = parseFloat(totalPrice) + 14.99;

    if (cartStatus === 'failed') {
        return <div>Error: {cartError}</div>;
    }

    return (
        <div className="px-[3%] grid lg:grid-cols-5 gap-10 pb-32">
            <div className="lg:col-span-3">
                {
                    (cartItems.length === 0)
                        ? <p className=" text-lg">Cart is empty</p>
                        : <div>
                            {
                                !isCheckingOut
                                    ? <CartItem cartItems={cartItems} handleDeleteCartItem={handleDeleteCartItem} quantities={quantities} handleQuantity={handleQuantity} />
                                    : <CheckOut totalPrice={amountToPay} cartItems={cartItems} setIsCheckingOut={setIsCheckingOut} />
                            }
                        </div>
                }
            </div>
            <div className="lg:col-span-2 space-y-6">
                <h1 className="text-xl">Order Summary</h1>
                <div className="border-y border-gray-300 w-full space-y-3 py-6 px-2">
                    <div className="flex justify-between">
                        <p>Total</p>
                        <p>${totalPrice}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Shipping Fees</p>
                        {cartItems.length > 0 ? <p>$14.99</p> : <p>$0.00</p>}
                    </div>
                </div>
                <div className="flex justify-between px-2 text-lg font-semibold">
                    <p>Subtotal</p>
                    {cartItems.length > 0 ? <p>${(parseFloat(totalPrice) + 14.99).toFixed(2)}</p> : <p>$0.00</p>}
                </div>
                <div className="px-2">
                    {
                        isCheckingOut
                            ? <button className="bg-black text-white text-lg font-semibold w-full h-12" onClick={() => setIsCheckingOut(false)}>Back to Cart</button>
                            : <button disabled={cartItems < 1} className="disabled:bg-gray-400 bg-black text-white text-lg font-semibold w-full h-12" onClick={() => setIsCheckingOut(true)}>Checkout</button>
                    }
                </div>
            </div>
        </div>
    );
};

export default Cart;
