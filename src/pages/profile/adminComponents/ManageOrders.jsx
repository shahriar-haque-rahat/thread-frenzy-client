import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPayment, updatePaymentItem } from "../../../redux/paymentSlice";
import { Helmet } from "react-helmet-async";

const ManageOrders = () => {
    const dispatch = useDispatch();
    const { payment, paymentStatus, paymentError } = useSelector(state => state.payment);

    const handleStatus = async (item) => {
        const updatedStatus = item.status === 'pending' ? 'delivered' : 'pending';
        try {
            await dispatch(updatePaymentItem({ id: item._id, status: updatedStatus })).unwrap();
            dispatch(getPayment());
        } catch (error) {
            console.error("Failed to update payment status: ", error);
        }
    };

    useEffect(() => {
        dispatch(getPayment());
    }, [dispatch]);

    if (paymentStatus === 'failed') {
        return <div>Error: {paymentError}</div>;
    }

    return (
        <>
            <Helmet>
                <title>Manage Orders | Thread Frenzy</title>
            </Helmet>
            <div className="space-y-6 mr-2 md:mr-0">
                <h1 className="h-40 w-full text-5xl font-semibold pl-10 pt-6 text-white bg-black flex gap-4 items-center">Order Management</h1>

                <div className=" overflow-x-auto">
                    <table className="table">
                        <thead className="text-black font-bold pb-2">
                            <tr className="border-b border-black">
                                <th>Date</th>
                                <th>Order ID</th>
                                <th>Transaction ID</th>
                                <th>Total Price</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        {
                            payment?.map(item => (
                                <tr key={item._id} className="text-center py-2 border-b border-gray-800">
                                    <td>{item.date.split('T')[0]}</td>
                                    <td>{item._id}</td>
                                    <td>{item.transactionId}</td>
                                    <td>{item.price}</td>
                                    <td>
                                        <button disabled={item.status === 'delivered'} onClick={() => handleStatus(item)} className={item.status === 'pending' ? "text-orange-500" : "text-green-500"}>
                                            {item.status}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </table>
                </div>
            </div>
        </>
    );
};

export default ManageOrders;
