import { useDispatch, useSelector } from "react-redux";
import { fetchMenCollections, setFilters, setMenCurrentPage } from "../../redux/dataSlice";
import { useEffect } from "react";
import SliderCards from "./SliderCards";
import Filters from "./Filters";
import { Helmet } from "react-helmet-async";
import Pagination from "./Pagination";

const Men = () => {
    const dispatch = useDispatch();
    const { menCollections, menDataStatus, error, menTotalPages, menCurrentPage, filters } = useSelector(state => state.data);

    useEffect(() => {
        dispatch(fetchMenCollections({ ...filters, page: menCurrentPage, limit: 6 }));
    }, [dispatch, filters, menCurrentPage]);

    const handleFilterChange = (newFilters) => {
        dispatch(setFilters(newFilters));
        dispatch(setMenCurrentPage(1));
    };    

    const handlePageChange = (page) => {
        dispatch(setMenCurrentPage(page));
    };

    if (menDataStatus === 'failed') {
        return <div>Error: {error}</div>;
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
                    <Filters onFilterChange={handleFilterChange} />
                    <div className="lg:col-span-4">
                        <SliderCards data={menCollections} />
                        <Pagination currentPage={menCurrentPage} totalPages={menTotalPages} onPageChange={handlePageChange} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Men;
