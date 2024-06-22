import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchWomenCollections, setFilters } from "../../redux/dataSlice";
import SliderCards from "./SliderCards";
import Filters from "./Filters";
import Pagination from "./Pagination";
import { Helmet } from "react-helmet-async";

const Women = () => {
    const dispatch = useDispatch();
    const { womenCollections, womenDataStatus, error, filters, pagination } = useSelector(state => state.data);

    useEffect(() => {
        dispatch(fetchWomenCollections({ ...filters }));
    }, [dispatch, filters, pagination.women.page, pagination.women.limit]);

    const handleFilterChange = (newFilters) => {
        dispatch(setFilters(newFilters));
    };

    if (womenDataStatus === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <Helmet>
                <title>Women Collections | Thread Frenzy</title>
            </Helmet>
            <div className="px-[3%] pb-32">
                <div className="flex justify-center items-center h-40 mb-10 border-b shadow-lg">
                    <h1 className="text-4xl">Women Collections</h1>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    <Filters onFilterChange={handleFilterChange} />
                    <div className="lg:col-span-4">
                        <SliderCards data={womenCollections} />
                        <Pagination filters={filters} gender="women" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Women;
