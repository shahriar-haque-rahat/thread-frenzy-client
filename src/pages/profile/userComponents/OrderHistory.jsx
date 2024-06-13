import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserSpecificPayment } from "../../../redux/paymentSlice";
import { AuthContext } from "../../../provider/AuthProvider";
// import { getUserByEmail } from "../../../redux/userSlice";

const OrderHistory = () => {
    const { userByEmail, userByEmailStatus, userByEmailError } = useContext(AuthContext);
    const dispatch = useDispatch();
    // const { userByEmail, userByEmailStatus, userByEmailError } = useSelector(state => state.user);
    const { userSpecificPayment, paymentStatus, paymentError } = useSelector(state => state.payment);

    // useEffect(() => {
    //     if (user) {
    //         dispatch(getUserByEmail(user?.email))
    //     }
    // }, [dispatch, user])

    useEffect(() => {
        if (userByEmailStatus === 'succeeded') {
            dispatch(getUserSpecificPayment(userByEmail.userEmail));
        }
    }, [dispatch, userByEmailStatus, paymentStatus, userByEmail]);

    if (paymentStatus === 'failed' || userByEmailStatus === 'failed') {
        return <div>Error: {paymentError || userByEmailError}</div>;
    }

    return (
        <div className=" mr-2 md:mr-0">
            <h1 className="h-40 w-full text-5xl font-semibold pl-10 pt-6 text-white bg-black flex gap-4 items-center">Order History</h1>

            <div className=" overflow-x-auto pt-10">
                <table className="table">
                    <thead className="text-black font-bold pb-2">
                        <tr className="border-b border-black">
                            <th>Date</th>
                            <th>Product</th>
                            <th>Color</th>
                            <th>Size</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userSpecificPayment?.map(item => (
                                <tr key={item._id} className=" border-b border-gray-400">
                                    <td>{item.date.split('T')[0]}</td>
                                    {
                                        item.orderedItems.map((orderedItem) => (
                                            <>
                                                <td><Link to={`/product-details/${orderedItem.itemId}`}>{orderedItem.name}</Link></td>
                                                <td>{orderedItem.color}</td>
                                                <td>{orderedItem.size}</td>
                                                <td>{orderedItem.quantity}</td>
                                            </>

                                        ))
                                    }
                                    <td>{item.price}</td>
                                    <td className={item.status === 'pending' ? " text-orange-500" : " text-green-500"}>{item.status}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderHistory;
