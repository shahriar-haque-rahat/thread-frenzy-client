import { useState } from "react";
import CartItem from "./CartItem";

const Cart = () => {
    const [quantities, setQuantities] = useState({});
    const [filteredCart, setFilteredCart] = useState([]);
    const totalPrice = filteredCart.reduce((acc, item) => acc + item.price * (quantities[item._id] || 1), 0).toFixed(2);

    return (
        <div className="px-[3%] grid lg:grid-cols-5 gap-10">
            <div className="lg:col-span-3">
                <CartItem filteredCart={filteredCart} setFilteredCart={setFilteredCart} quantities={quantities} setQuantities={setQuantities}></CartItem>
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
                        {filteredCart.length > 0 ? <p>$14.99</p> : <p>$0.00</p>}
                    </div>
                </div>
                <div className="flex justify-between px-2 text-lg font-semibold">
                    <p>Subtotal</p>
                    {filteredCart.length > 0 ? <p>${(parseFloat(totalPrice) + 14.99).toFixed(2)}</p> : <p>$0.00</p>}
                </div>
                <div className=" px-2">
                    <button className="bg-black text-white text-lg font-semibold w-full h-12">Check Out</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
