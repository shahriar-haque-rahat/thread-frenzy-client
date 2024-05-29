import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";


const CartItem = ({ filteredCart, handleDeleteCartItem, quantities, handleQuantity, }) => {

    return (
        <div className=" space-y-10">
            <h1 className="text-3xl mb-10">Cart Items</h1>
            {
                filteredCart.map(item => (
                    <div key={item._id} className="flex gap-4 h-40 border border-black">
                        <img className="h-full w-32 object-cover object-top" src={item.image} alt="loading..." />
                        <div className="w-full flex flex-col justify-between p-3">
                            <div className="flex justify-between items-start">
                                <div>
                                    <Link to={`/product-details/${item.itemId}`}><h1 className="text-xl">{item.name}</h1></Link>
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