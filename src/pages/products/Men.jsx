import { useDispatch, useSelector } from "react-redux";
import { fetchMenCollections, setCurrentPage } from "../../redux/dataSlice";
import { useEffect, useState } from "react";
import SliderCards from "./SliderCards";
import Filters from "./Filters";
import CollectionsSkeleton from "../skeletons/CollectionsSkeleton";
import { Helmet } from "react-helmet-async";
import Pagination from "./Pagination";

const Men = () => {
    const dispatch = useDispatch();
    const { menCollections, menDataStatus, totalPages, currentPage } = useSelector(state => state.data);
    const [filteredData, setFilteredData] = useState([]);
    const [filters, setFilters] = useState({});
    console.log(menCollections);

    useEffect(() => {
            dispatch(fetchMenCollections(filters));
    }, [dispatch]);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handlePageChange = (newPage) => {
        dispatch(setCurrentPage(newPage));
    }

    if (menDataStatus === 'loading') {
        return <CollectionsSkeleton />;
    }

    return (
        <>
            <Helmet>
                <title>Men Collections | Thread Frenzy</title>
            </Helmet>
            <div className="px-[3%] pb-32">
                <div className="flex justify-center items-center h-40 mb-10 border-b shadow-lg">
                    <h1 className="text-4xl">Men Collections</h1>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    <Filters collections={menCollections} setFilteredData={setFilteredData} onFilterChange={handleFilterChange} />
                    <div className="lg:col-span-4 overflow-y-scroll h-screen">
                        <SliderCards data={filteredData} />
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Men;
