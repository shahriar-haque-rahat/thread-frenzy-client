import { useDispatch, useSelector } from "react-redux";
import { allData } from "../../redux/dataSlice";
import { useEffect } from "react";
import SliderCards from "./SliderCards";

const Women = () => {
    const dispatch = useDispatch();
    const { womenCollections, allDataStatus } = useSelector(state => state.data)

    useEffect(() => {
        if (allDataStatus === 'idle') {
            dispatch(allData());
        }
    }, [allDataStatus, dispatch]);

    return (
        <div className=" px-[5%]">
            <div className=" flex justify-center items-center h-40 mb-10 border-b shadow-lg">
                <h1 className=" text-4xl">Women Collections</h1>
            </div>
            <SliderCards data={womenCollections}/>
        </div>
    );
};

export default Women;