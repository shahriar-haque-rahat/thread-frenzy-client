import { Helmet } from "react-helmet-async";
import LineChartComponent from "./charts/LineChartComponent";
import PieChartComponent from "./charts/PieChartComponent";
import BarChartComponent from "./charts/BarChartComponent";
import RadialBarChartComponent from "./charts/RadialBarChartComponent";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../../../redux/userSlice";
import { getPayment } from "../../../redux/paymentSlice";
import { allData } from "../../../redux/dataSlice";


const SalesOverview = () => {
    const dispatch = useDispatch();
    const { user, userStatus, userError } = useSelector(state => state.user);
    const { payment, paymentStatus, paymentError } = useSelector(state => state.payment);
    const { menCollections, womenCollections, allDataStatus, allDataError } = useSelector(state => state.data);

    // console.log(user, payment, menCollections, womenCollections);

    useEffect(() => {
        dispatch(getUser());
        dispatch(getPayment());
        dispatch(allData({}));
    }, [dispatch])


    if (userStatus === 'failed' || paymentStatus === 'failed' || allDataStatus === 'failed') {
        return <div>error: {userError || paymentError || allDataError}</div>
    }

    return (
        <>
            <Helmet>
                <title>Sales Overview | Thread Frenzy</title>
            </Helmet>
            <div className="space-y-6">
                <h1 className="h-40 w-full text-5xl font-semibold pl-10 pt-6 text-white bg-black flex gap-4 items-center">Sales Overview</h1>

                <div className=" grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-0">
                    <BarChartComponent payment={payment} />
                    <LineChartComponent payment={payment} />
                    <PieChartComponent menCollections={menCollections} womenCollections={womenCollections} />
                    <RadialBarChartComponent user={user} />
                </div>
            </div>
        </>
    );
};

export default SalesOverview;