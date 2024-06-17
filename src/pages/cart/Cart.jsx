import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../provider/AuthProvider";
import { getCart, updateCartItem } from "../../redux/cartSlice";
import CartItem from "./CartItem";
import CheckOut from "./CheckOut";
import { Helmet } from "react-helmet-async";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { allData, getItemById, updateItem } from "../../redux/dataSlice";

const MySwal = withReactContent(Swal);

const Cart = () => {
    const dispatch = useDispatch();
    const { user } = useContext(AuthContext);
    const { cartItems, cartStatus, cartError } = useSelector(state => state.cart);
    const [quantities, setQuantities] = useState({});
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    const handleQuantity = (item, id, operation) => {
        setQuantities(prevQuantities => {
            const newQuantity = operation === "+" ? prevQuantities[id] + 1 : prevQuantities[id] - 1;
            const updatedQuantity = newQuantity < 1 ? 1 : newQuantity;

            dispatch(updateCartItem({ id, quantity: updatedQuantity }))
                .unwrap()
                .then(() => {
                    dispatch(getCart(user.email));
                    updateProductInventory(item, updatedQuantity - prevQuantities[id]);
                })
                .catch(error => {
                    console.error('Update operation failed:', error);
                    MySwal.fire({
                        title: 'Error!',
                        text: 'Failed to update cart item. Please try again.',
                        icon: 'error',
                        confirmButtonColor: 'black',
                        customClass: {
                            popup: 'square',
                            confirmButton: 'square'
                        }
                    });
                });

            return {
                ...prevQuantities,
                [id]: updatedQuantity
            };
        });
    };

    const updateProductInventory = (item, quantityChange) => {
        dispatch(getItemById(item.itemId))
            .then(response => {
                let colorIndex = -1;
                Object.keys(response.payload.quantity).forEach((key, i) => {
                    if (key === item.color) {
                        colorIndex = i;
                    }
                });

                const updatedQuantity = response.payload.quantity[item.color] - quantityChange;
                const updatedProduct = {
                    ...response.payload,
                    quantity: {
                        ...response.payload.quantity,
                        [response.payload.color[colorIndex]]: updatedQuantity,
                    },
                };

                return dispatch(updateItem({ id: item.itemId, updatedProduct }));
            })
            .then(() => {
                dispatch(allData());
            })
            .catch(error => {
                console.error('Update operation failed:', error);
                MySwal.fire({
                    title: 'Error!',
                    text: 'Failed to update product inventory. Please try again.',
                    icon: 'error',
                    confirmButtonColor: 'black',
                    customClass: {
                        popup: 'square',
                        confirmButton: 'square'
                    }
                });
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
    }, [cartItems]);

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * (quantities[item._id] || 1), 0).toFixed(2);
    const amountToPay = parseFloat(totalPrice) + 14.99;

    if (cartStatus === 'failed') {
        return <div>Error: {cartError}</div>;
    }

    return (
        <>
            <Helmet>
                <title>Cart | Thread Frenzy</title>
            </Helmet>
            <div className="px-[3%] grid lg:grid-cols-5 gap-10 pb-32">
                <div className="lg:col-span-3">
                    {
                        (cartItems.length === 0)
                            ? <p className=" text-lg">Cart is empty</p>
                            : <div>
                                {
                                    !isCheckingOut
                                        ? <CartItem cartItems={cartItems} quantities={quantities} handleQuantity={handleQuantity} userEmail={user.email} />
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
                                : <button disabled={cartItems.length < 1} className="disabled:bg-gray-400 bg-black text-white text-lg font-semibold w-full h-12" onClick={() => setIsCheckingOut(true)}>Checkout</button>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;
