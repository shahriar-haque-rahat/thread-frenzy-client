import { useEffect } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

const DashboardPagination = ({ totalItems, currentPage, totalPages, handlePageChange }) => {

    useEffect(() => {
        if (totalItems <= (currentPage - 1) * 6 && currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    }, [totalItems]);

    return (
        <div>
            {
                totalItems === 0 ? <div></div>
                    : <div className="flex justify-center mt-4">
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className={currentPage === 1 ? " py-1 px-2 border bg-gray-200 text-black text-sm" : " py-1 px-2 border text-sm"}>
                            <RiArrowLeftSLine size={20} />
                        </button>

                        <span className="px-4 py-1 w-28 text-center text-sm">{`Page ${currentPage} of ${totalPages}`}</span>

                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className={currentPage === totalPages ? " py-1 px-2 border bg-gray-200 text-black text-sm" : " py-1 px-2 border text-sm"}>
                            <RiArrowRightSLine size={20} />
                        </button>
                    </div>
            }
        </div>
    );
};

export default DashboardPagination;