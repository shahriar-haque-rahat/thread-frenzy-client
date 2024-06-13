import { useDispatch, useSelector } from "react-redux";
import { allData } from "../../redux/dataSlice";
import { useEffect, useState } from "react";
import SliderCards from "./SliderCards";
import Filters from "./Filters";

const Men = () => {
    const dispatch = useDispatch();
    const { menCollections, allDataStatus } = useSelector(state => state.data);
    const [filteredData, setFilteredData] = useState([]);
    const [filters, setFilters] = useState({});

    useEffect(() => {
        if (allDataStatus === 'idle') {
            dispatch(allData(filters));
        }
    }, [allDataStatus, dispatch, filters]);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <div className="px-[3%] pb-32">
            <div className="flex justify-center items-center h-40 mb-10 border-b shadow-lg">
                <h1 className="text-4xl">Men Collections</h1>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <Filters collections={menCollections} setFilteredData={setFilteredData} onFilterChange={handleFilterChange} />
                <div className="lg:col-span-4 overflow-y-scroll h-screen">
                    <SliderCards data={filteredData} />
                </div>
            </div>
        </div>
    );
};

export default Men;

