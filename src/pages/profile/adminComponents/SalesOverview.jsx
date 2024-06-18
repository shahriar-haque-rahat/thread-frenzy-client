import { Helmet } from "react-helmet-async";
import LineChartComponent from "./charts/LineChartComponent";
import PieChartComponent from "./charts/PieChartComponent";
import BarChartComponent from "./charts/BarChartComponent";
import RadialBarChartComponent from "./charts/RadialBarChartComponent";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllUser } from "../../../redux/userSlice";
import { getAllPayment } from "../../../redux/paymentSlice";
import { getAllTshirtData } from "../../../redux/dataSlice";


const SalesOverview = () => {
    const dispatch = useDispatch();
    const { allUser, allUserStatus, allUserError } = useSelector(state => state.user);
    const { allPayment, allPaymentStatus, allPaymentError } = useSelector(state => state.payment);
    const { allTshirtData, allTshirtDataStatus, error } = useSelector(state => state.data);

    // console.log(allUser, allPayment, menCollections, womenCollections);

    useEffect(() => {
        dispatch(getAllUser());
        dispatch(getAllPayment());
        dispatch(getAllTshirtData());
    }, [dispatch])


    if (allUserStatus === 'failed' || allPaymentStatus === 'failed' || allTshirtDataStatus === 'failed') {
        return <div>error: {allUserError || allPaymentError || error}</div>
    }

    return (
        <>
            <Helmet>
                <title>Sales Overview | Thread Frenzy</title>
            </Helmet>
            <div className="space-y-6">
                <h1 className="h-40 w-full text-5xl font-semibold pl-10 pt-6 text-white bg-black flex gap-4 items-center">Sales Overview</h1>

                <div className=" grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-0">
                    <BarChartComponent payment={allPayment} />
                    <LineChartComponent payment={allPayment} />
                    <PieChartComponent allTshirtData={allTshirtData}/>
                    <RadialBarChartComponent user={allUser} />
                </div>
            </div>
        </>
    );
};

export default SalesOverview;