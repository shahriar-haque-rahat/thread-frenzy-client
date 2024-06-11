import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPayment } from "../../../redux/paymentSlice";

const OrderHistory = () => {

    const dispatch = useDispatch();
    const { payment, paymentStatus, paymentError } = useSelector(state => state.payment)


    useEffect(() => {
        if (paymentStatus === 'idle') {
            dispatch(getPayment())
        }
    }, [dispatch, paymentStatus])

    if (paymentStatus === 'failed') {
        return <div>Error: {paymentError}</div>;
    }

    return (
        <div>
            <h1 className="h-40 w-full text-5xl font-semibold pl-10 pt-6 text-white bg-black flex gap-4 items-center">Order History</h1>
            <div className=" pt-10 grid grid-cols-8 gap-2 border-y border-gray-600 font-bold pb-2">
                <div>Date</div>
                <div className=" col-span-2">Product</div>
                <div className=" text-center">Color</div>
                <div className=" text-center">Size</div>
                <div className=" text-center">Quantity</div>
                <div className=" text-center">Total Price</div>
                <div className=" text-center">Status</div>
            </div>
            {
                payment?.map(item => (
                    <div key={item._id} className=" grid grid-cols-8 gap-2 border-b border-gray-600">
                        <div className=" py-3 text-sm">{item.date.split('T')[0]}</div>
                        <div className=" col-span-5">
                            {
                                item.orderedItems.map((item, idx) => (
                                    <div key={idx} className="grid grid-cols-5 gap-2 py-2">
                                        <Link className=" col-span-2" to={`/product-details/${item.itemId}`}>{item.name}</Link>
                                        <div className=" text-center">{item.color}</div>
                                        <div className=" text-center">{item.size}</div>
                                        <div className=" text-center">{item.quantity}</div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className=" py-2 text-center">{item.price}</div>
                        <div className={item.status === 'pending' ? " py-2 text-center text-orange-500" : " py-2 text-center text-green-500"}>{item.status}</div>
                    </div>
                ))
            }
        </div>
    );
};

export default OrderHistory;