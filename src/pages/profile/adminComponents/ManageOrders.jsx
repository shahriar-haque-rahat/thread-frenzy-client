import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPayment, updatePaymentItem } from "../../../redux/paymentSlice";



const ManageOrders = () => {
    const dispatch = useDispatch();
    const { payment, paymentStatus, paymentError } = useSelector(state => state.payment)

    const handleStatus = (item) => {
        const updatedStatus = item.status === 'pending' ? 'delivered' : 'pending';
        dispatch(updatePaymentItem({ id: item._id, status: updatedStatus }))
            .then(() => {
                dispatch(getPayment())
            })
    }


    useEffect(() => {
        if (paymentStatus === 'idle') {
            dispatch(getPayment())
        }
    }, [dispatch, paymentStatus])

    if (paymentStatus === 'failed') {
        return <div>Error: {paymentError}</div>;
    }

    return (
        <div className="space-y-6">
            <h1 className="h-40 w-full text-5xl font-semibold pl-10 pt-6 text-white bg-black flex gap-4 items-center">Order Management</h1>
            <div>
                <div className=" grid grid-cols-7 gap-3 text-center font-bold pb-2 border-b border-gray-800">
                    <div>Date</div>
                    <div className=" col-span-2">Order ID</div>
                    <div className=" col-span-2">Transaction ID</div>
                    <div>Total Price</div>
                    <div>Status</div>
                </div>
                {
                    payment?.map(item => (
                        <div key={item._id} className=" grid grid-cols-7 gap-3 text-center py-2 border-b border-gray-800">
                            <div>{item.date.split('T')[0]}</div>
                            <div className="overflow-hidden col-span-2">{item._id}</div>
                            <div className="overflow-hidden col-span-2">{item.transactionId}</div>
                            <div>{item.price}</div>
                            <button disabled={item.status === 'delivered'} onClick={() => handleStatus(item)} className={item.status === 'pending' ? "text-orange-500" : "text-green-500"}>{item.status}</button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default ManageOrders;