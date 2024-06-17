import { useDispatch, useSelector } from "react-redux";
import { fetchWomenCollections, setCurrentPage } from "../../redux/dataSlice";
import { useEffect, useState } from "react";
import SliderCards from "./SliderCards";
import Filters from "./Filters";
import CollectionsSkeleton from "../skeletons/CollectionsSkeleton";
import { Helmet } from "react-helmet-async";
import Pagination from "./Pagination";

const Women = () => {
    const dispatch = useDispatch();
    const { womenCollections, womenDataStatus, totalPages, currentPage } = useSelector(state => state.data);
    const [filteredData, setFilteredData] = useState([]);
    const [filters, setFilters] = useState({});
    console.log(womenCollections);

    useEffect(() => {
            dispatch(fetchWomenCollections(filters));
    }, [dispatch]);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handlePageChange = (newPage) => {
        dispatch(setCurrentPage(newPage));
    }

    if (womenDataStatus === 'loading') {
        return <CollectionsSkeleton />;
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
                    <Filters collections={womenCollections} setFilteredData={setFilteredData} onFilterChange={handleFilterChange} />
                    <div className="lg:col-span-4 overflow-y-scroll h-screen">
                        <SliderCards data={filteredData} />
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Women;
