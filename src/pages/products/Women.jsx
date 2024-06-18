import { useDispatch, useSelector } from "react-redux";
import { fetchWomenCollections, setFilters, setWomenCurrentPage } from "../../redux/dataSlice";
import { useEffect } from "react";
import SliderCards from "./SliderCards";
import Filters from "./Filters";
import { Helmet } from "react-helmet-async";
import Pagination from "./Pagination";

const Women = () => {
    const dispatch = useDispatch();
    const { womenCollections, womenDataStatus, error, womenTotalPages, womenCurrentPage, filters } = useSelector(state => state.data);

    useEffect(() => {
        dispatch(fetchWomenCollections({ ...filters, page: womenCurrentPage, limit: 6 }));
    }, [dispatch, filters, womenCurrentPage]);

    const handleFilterChange = (newFilters) => {
        dispatch(setFilters(newFilters));
        dispatch(setWomenCurrentPage(1));
    };

    const handlePageChange = (page) => {
        dispatch(setWomenCurrentPage(page));
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
                        <Pagination currentPage={womenCurrentPage} totalPages={womenTotalPages} onPageChange={handlePageChange} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Women;
