import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allData } from "../../redux/dataSlice";
import SliderCards from "./SliderCards";


const SimilarProducts = ({ itemBrand }) => {
    const dispatch = useDispatch();
    const { data, allDataStatus, error } = useSelector((state) => state.data);
    const filteredData = data?.filter(item => item.brand === itemBrand);
    console.log(filteredData);

    useEffect(() => {
        if (allDataStatus === 'idle') {
            dispatch(allData());
        }
    }, [allDataStatus, dispatch]);

    // TODO: loading and failed status set korte hobe
    if (allDataStatus === 'loading') {
        return <div>Loading...</div>;
    }

    if (allDataStatus === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <SliderCards data={filteredData}/>
        </>
    );
};

export default SimilarProducts;