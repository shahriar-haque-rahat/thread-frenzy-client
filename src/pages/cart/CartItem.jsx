import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../provider/AuthProvider";
import { getCart, updateCartItem, deleteCartItem } from "../../redux/cartSlice";
import { RxCross2 } from "react-icons/rx";


const CartItem = ({ filteredCart, setFilteredCart, quantities, setQuantities }) => {
    const { user } = useContext(AuthContext);
    const dispatch = useDispatch();
    const { cartItems, cartStatus, cartError } = useSelector(state => state.cart);


    const handleQuantity = (id, operation) => {
        setQuantities(prevQuantities => {
            const newQuantity = operation === "+" ? prevQuantities[id] + 1 : prevQuantities[id] - 1;
            const updatedQuantity = newQuantity < 1 ? 1 : newQuantity;

            dispatch(updateCartItem({ id, quantity: updatedQuantity }));

            return {
                ...prevQuantities,
                [id]: updatedQuantity
            };
        });
    };

    const handleDeleteCartItem = (id) => {
        dispatch(deleteCartItem(id))
            .unwrap()
            .then(() => {
                setFilteredCart(prevFilteredCart => prevFilteredCart.filter(item => item._id !== id));
            });
    };

    useEffect(() => {
        if (user?.email) {
            dispatch(getCart(user.email));
        }
    }, [dispatch, user]);

    useEffect(() => {
        if (cartItems) {
            setFilteredCart(cartItems);
            const initialQuantities = cartItems.reduce((acc, item) => {
                acc[item._id] = item.quantity;
                return acc;
            }, {});
            setQuantities(initialQuantities);
        }
    }, [cartItems, setFilteredCart, setQuantities]);

    if (cartStatus === 'loading') {
        return <div>Loading...</div>;
    }

    if (cartStatus === 'failed') {
        return <div>Error: {cartError}</div>;
    }

    return (
        <div className=" space-y-10">
            {
                filteredCart.map(item => (
                    <div key={item._id} className="flex gap-4 h-40 border border-black">
                        <img className="h-full w-32 object-cover object-top" src={item.image} alt="loading..." />
                        <div className="w-full flex flex-col justify-between p-3">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h1 className="text-xl">{item.name}</h1>
                                    <p>{item.color}</p>
                                    <p>Size: {item.size}</p>
                                </div>
                                <button onClick={() => handleDeleteCartItem(item._id)}><RxCross2 size={25} /></button>
                            </div>
                            <div className="flex justify-between items-end">
                                <div className="flex items-center gap-4">
                                    <p onClick={() => handleQuantity(item._id, "-")} className="w-[20px] h-[20px] lg:w-[35px] lg:h-[35px] rounded-full flex justify-center items-center text-xl cursor-pointer active:scale-95 duration-300 border"> - </p>
                                    <p className="px-5 py-1 font-semibold border ">{quantities[item._id]}</p>
                                    <p onClick={() => handleQuantity(item._id, "+")} className="w-[20px] h-[20px] lg:w-[35px] lg:h-[35px] rounded-full flex justify-center items-center text-xl cursor-pointer active:scale-95 duration-300 border"> + </p>
                                </div>
                                <p className="text-lg font-semibold">${(item.price * quantities[item._id]).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default CartItem;