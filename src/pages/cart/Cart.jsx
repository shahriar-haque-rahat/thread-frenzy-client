import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../provider/AuthProvider";
import { getCart } from "../../redux/cartSlice";
import { RxCross2 } from "react-icons/rx";

const Cart = () => {
    const { user } = useContext(AuthContext);
    const dispatch = useDispatch();
    const { cartItems, cartStatus, cartError } = useSelector(state => state.cart);
    const [quantities, setQuantities] = useState({});

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

    const handleQuantity = (id, operation) => {
        setQuantities(prevQuantities => {
            const newQuantity = operation === "+" ? prevQuantities[id] + 1 : prevQuantities[id] - 1;
            return {
                ...prevQuantities,
                [id]: newQuantity < 1 ? 1 : newQuantity
            };
        });
    };

    // loading failed thik korte hbe
    if (cartStatus === 'loading') {
        return <div>Loading...</div>;
    }

    if (cartStatus === 'failed') {
        return <div>Error: {cartError}</div>;
    }

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * (quantities[item._id] || 1), 0);

    return (
        <div className="px-[3%] grid grid-cols-5 gap-10">
            <div className=" col-span-3 space-y-10 ">
                {
                    cartItems?.map(item => (
                        <div key={item._id} className="flex gap-6 border border-black">
                            <img className="h-40 w-32 object-cover object-top" src={item.image} alt="loading..." />
                            <div className="w-full flex flex-col justify-between p-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h1 className="text-xl">{item.name}</h1>
                                        <p>{item.color}</p>
                                        <p>Size: {item.size}</p>
                                    </div>
                                    <button><RxCross2 size={25} /></button>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div className="flex items-center gap-4">
                                        <p onClick={() => handleQuantity(item._id, "-")} className="w-[20px] h-[20px] lg:w-[35px] lg:h-[35px] rounded-full flex justify-center items-center text-xl cursor-pointer active:scale-95 duration-300 border"> - </p>
                                        <p className="px-5 py-1 font-semibold border ">{quantities[item._id]}</p>
                                        <p onClick={() => handleQuantity(item._id, "+")} className="w-[20px] h-[20px] lg:w-[35px] lg:h-[35px] rounded-full flex justify-center items-center text-xl cursor-pointer active:scale-95 duration-300 border"> + </p>
                                    </div>
                                    <p className=" text-lg font-semibold">${item.price * quantities[item._id]}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="col-span-2 space-y-6">
                <h1 className="text-xl">Order Summary</h1>
                <div className=" border-y border-gray-300 w-full space-y-3 py-6 px-2">
                    <div className=" flex justify-between">
                        <p>Total</p>
                        <p>${totalPrice}</p>
                    </div>
                    <div className=" flex justify-between">
                        <p>Shipping Fees</p>
                        <p>$70</p>
                    </div>
                </div>
                <div className=" flex justify-between px-2 text-lg font-semibold">
                    <p>Subtotal</p>
                    <p>${totalPrice + 70}</p>
                </div>
                <button className=" bg-black text-white text-lg font-semibold w-full h-12 mx-2">Check Out</button>
            </div>
        </div>
    );
};

export default Cart;
