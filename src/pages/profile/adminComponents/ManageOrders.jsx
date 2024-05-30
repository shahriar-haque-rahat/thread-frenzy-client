import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCart } from "../../../redux/cartSlice";
import { IoMdDoneAll } from "react-icons/io";


const ManageOrders = () => {
    const dispatch = useDispatch();
    const { allCartItems, allCartStatus, allCartError } = useSelector(state => state.cart);

    useEffect(() => {
        if (allCartStatus === 'idle') {
            dispatch(getAllCart());
        }
    }, [dispatch, allCartStatus])

    if (allCartStatus === 'loading') {
        return <div>Loading...</div>;
    }

    if (allCartStatus === 'failed') {
        return <div>Error: {allCartError}</div>;
    }

    return (
        <div className="mt-6 mr-6 space-y-6">
            <h1 className="h-40 w-full text-5xl font-semibold pl-10 pt-6 text-white bg-black flex gap-4 items-center">Order Management</h1>
            <div className=" pt-10">
                <div className=" grid grid-cols-6 gap-3 text-center pb-2 border-b border-gray-800">
                    <div>Date</div>
                    <div>Order ID</div>
                    <div>Transaction ID</div>
                    <div>Quantity</div>
                    <div>Total Price</div>
                    <div>Status</div>
                </div>
                {
                    allCartItems?.map(item => (
                        <div key={item._id} className=" grid grid-cols-6 gap-3 text-center py-2 border-b border-gray-400">
                            <div>{item?.data}</div>
                            <div className=" overflow-hidden">{item._id}</div>
                            <div>{item?.transactionId}</div>
                            <div>{item?.quantity}</div>
                            <div>{item?.price * item?.quantity}</div>
                            <div className=" flex justify-between items-center">
                                <p className={item?.status === "pending" ? "text-orange-500" : "text-green-500"}>{item?.status}</p>
                                {
                                    item?.status === "pending" && <button><IoMdDoneAll className=" text-green-600" size={25}/></button>
                                }
                                
                                </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default ManageOrders;